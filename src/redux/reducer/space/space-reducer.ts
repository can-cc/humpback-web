import { AppAction, AxiosSuccessAction } from '../../action/action';
import { ISpace } from '../../../domain/space';
import { IPage, IPageBlock, IPageDetail } from '../../../domain/page';
import { NormalizedEntities } from '../interface';
import { CreatePageBlockRequest, MovePageBlockPayload } from '../../action/page-block-action';
import {
  reduceCreatePageBlock,
  reduceCreatePageBlockSuccess,
  reducePageDetail,
  reducePageList,
  reduceSpaceList,
} from './reduce-function';
import { selectPage } from '../../selector/page-selector';
import { AppRootState } from '../index';
import { AppLogger } from '../../../util/logger';
import cloneDeep from 'lodash/cloneDeep';
import { mergePageDetailToState } from './share';

export interface SpaceState {
  spaces: string[];
  spaceEntities: NormalizedEntities<ISpace>;
  pageEntities: NormalizedEntities<IPage | IPageDetail>;
  pageBlockEntities: NormalizedEntities<IPageBlock>;
}

const defaultSpaceState = {
  spaces: [],
  spaceEntities: {},
  pageEntities: {},
  pageBlockEntities: {},
};

function reduceMovePageBlock(state: SpaceState, action: ReturnType<typeof MovePageBlockPayload>): SpaceState {
  const page: IPageDetail = selectPage({ space: state } as AppRootState, action.meta.pageId);
  if (!page) {
    AppLogger.error(new Error(`select a does not exist space, space id = ${action.meta.pageId}`));
    return state;
  }
  const newPage = cloneDeep(page);
  if (!newPage.blocks) {
    AppLogger.error(new Error(`page blocks is undefined`));
    return state;
  }
  const draggedBlock = newPage.blocks.find((b) => b.id === action.meta.blockId);
  const draggedBlockIndex = newPage.blocks.findIndex((b) => b.id === action.meta.blockId);
  if (draggedBlockIndex < 0) {
    AppLogger.error(new Error(`moving block not exist.`));
    return state;
  }
  newPage.blocks.splice(draggedBlockIndex, 1);
  newPage.blocks.splice(action.meta.atIndex, 0, draggedBlock);
  return mergePageDetailToState(state, newPage);
}

export function SpaceReducer(
  state: SpaceState = defaultSpaceState,
  action: AxiosSuccessAction | AppAction
): SpaceState {
  switch (action.type) {
    case 'QUERY_SPACE_LIST_SUCCESS':
      return reduceSpaceList(state, action);

    case 'QUERY_PAGE_LIST_SUCCESS':
      return reducePageList(state, action as AxiosSuccessAction);

    case 'QUERY_PAGE_DETAIL_SUCCESS':
      return reducePageDetail(state, action as AxiosSuccessAction);

    case 'CREATE_PAGE_BLOCK':
      return reduceCreatePageBlock(state, action as ReturnType<typeof CreatePageBlockRequest>);

    case 'CREATE_PAGE_BLOCK_SUCCESS':
      return reduceCreatePageBlockSuccess(state, action);

    case 'MOVE_PAGE_BLOCK':
      return reduceMovePageBlock(state, action as ReturnType<typeof MovePageBlockPayload>);

    default:
      return state;
  }
}
