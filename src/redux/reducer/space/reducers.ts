import { AxiosSuccessAction } from '../../action/action';
import { AppLogger } from '../../../util/logger';
import { ISpace } from '../../../domain/space';
import { IPage, IPageBlock, IPageDetail } from '../../../domain/page';
import { normalize } from 'normalizr';
import { SpaceListSchema, SpaceSchema } from '../../normalizr';
import { buildStateWorker } from '../reducer-util';
import { mergePageDetailToState, mergeSpaceInState } from './share';
import { SpaceState } from './space-reducer';
import { NormalizedEntities } from '../interface';
import { CreatePageBlockRequest, MovePageBlockRequest } from '../../action/page-block-action';
import { selectPage } from '../../selector/page-selector';
import { AppRootState } from '../index';
import cloneDeep from 'lodash/cloneDeep';
import remove from 'lodash/remove';
import { UpdatePageRequest } from '../../action/page-action';

function mergePageEntities(pageEntities: NormalizedEntities<IPage>) {
  return function(state: SpaceState): SpaceState {
    return Object.keys(pageEntities).reduce((state: SpaceState, id: string): SpaceState => {
      return {
        ...state,
        pageEntities: {
          ...state.pageEntities,
          [id]: {
            ...state.pageEntities[id],
            ...pageEntities[id]
          }
        }
      };
    }, state);
  };
}

export function reducePageListSuccess(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  if (!action.payload.data || !action.payload.data.length) {
    return state;
  }
  const spaceId = action.meta.previousAction.meta.spaceId;
  const space = state.spaceEntities[spaceId];
  // if (!space) {
  //   AppLogger.error(`space not found in state, [action] = `, action);
  //   return state;
  // }
  const spaceWithPages: ISpace = { ...space, pages: action.payload.data as IPage[] };
  const normalizedData = normalize(spaceWithPages, SpaceSchema);
  return buildStateWorker<SpaceState>(state).pipe(
    mergeSpaceInState(normalizedData.entities.spaces[normalizedData.result]),
    mergePageEntities(normalizedData.entities.pages)
  );
}

export function reducePageDetail(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  return mergePageDetailToState(state, action.payload.data);
}

export function reduceSpaceList(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  const normalizedData = normalize<ISpace>(action.payload.data, SpaceListSchema);
  return {
    ...state,
    spaces: normalizedData.result,
    spaceEntities: normalizedData.result.reduce((result, spaceId) => {
      result[spaceId] = {
        ...state.spaceEntities[spaceId],
        ...normalizedData.entities.spaces[spaceId]
      };
      return result;
    }, {})
  };
}

export function reduceCreatePageBlock(
  state: SpaceState,
  action: ReturnType<typeof CreatePageBlockRequest>
): SpaceState {
  const page: IPageDetail = selectPage({ space: state } as AppRootState, action.meta.pageId);
  if (!page) {
    AppLogger.error(new Error(`select a does not exist space, space id = ${action.meta.pageId}`));
    return state;
  }
  const newPage = cloneDeep(page);
  const newBlock = {
    id: action.meta.temporaryId,
    content: action.meta.content,
    focusInitial: action.meta.focusInitial
  };
  if (!newPage.blocks) {
    newPage.blocks = [newBlock];
  } else {
    const previousBlockIndex = newPage.blocks.findIndex(b => b.id === action.meta.previousBlockId);
    if (previousBlockIndex >= 0) {
      newPage.blocks.splice(previousBlockIndex + 1, 0, newBlock);
    } else {
      newPage.blocks.push(newBlock);
    }
  }
  return mergePageDetailToState(state, newPage);
}

export function reduceCreatePageBlockSuccess(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  const temporaryBlockId = action.meta.previousAction.meta.temporaryId;
  const pageId = action.meta.previousAction.meta.pageId;
  const createdBlockId = action.payload.data;
  const page = selectPage(
    {
      space: state
    } as AppRootState,
    pageId
  );
  if (!page) {
    AppLogger.error(new Error(`select a does not exist space, space id = ${pageId}`));
    return state;
  }
  const newPage: IPageDetail = cloneDeep(page);
  const block = newPage.blocks.find((b: IPageBlock) => b.id === temporaryBlockId);
  if (!block) {
    AppLogger.error(new Error(`temporary block not found`));
    return state;
  }
  block.id = createdBlockId;
  block.focusInitial = action.meta.previousAction.meta.focusInitial;
  const newState = mergePageDetailToState(state, newPage);
  delete newState.pageBlockEntities[temporaryBlockId];
  return newState;
}

export function reduceMovePageBlock(state: SpaceState, action: ReturnType<typeof MovePageBlockRequest>): SpaceState {
  const page: IPageDetail = selectPage({ space: state } as AppRootState, action.payload.pageId);
  if (!page) {
    AppLogger.error(new Error(`select a does not exist space, space id = ${action.payload.pageId}`));
    return state;
  }
  const newPage = cloneDeep(page);
  if (!newPage.blocks) {
    AppLogger.error(new Error(`page blocks is undefined`));
    return state;
  }
  newPage.blocks = action.payload.resortedBlocks;
  return mergePageDetailToState(state, newPage);
}

export function reduceUpdatePage(state: SpaceState, action: ReturnType<typeof UpdatePageRequest>): SpaceState {
  return {
    ...state,
    pageEntities: {
      ...state.pageEntities,
      [action.meta.pageId]: {
        ...state.pageEntities[action.meta.pageId],
        ...action.meta
      }
    }
  };
}

export function reduceDeletePageBlock(state: SpaceState, action: AxiosSuccessAction) {
  const pageId = action.meta.previousAction.payload.pageId;
  const blockId = action.meta.previousAction.payload.blockId;
  const newBlocks = Array.from(state.pageEntities[pageId].blocks);
  remove(newBlocks, id => blockId === id);
  return {
    ...state,
    pageEntities: {
      ...state.pageEntities,
      [pageId]: {
        ...state.pageEntities[pageId],
        blocks: newBlocks
      }
    }
  };
}
