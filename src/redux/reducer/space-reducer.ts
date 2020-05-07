import { AppAction, AxiosSuccessAction } from '../action/action';
import { normalize } from 'normalizr';
import { PageSchema, SpaceListSchema, SpaceSchema } from '../normalizr';
import { ISpace } from '../../domain/space';
import { IPage, IPageBlock } from '../../domain/page';
import { AppLogger } from '../../util/logger';
import { buildStateWorker } from './reducer-util';
import { NormalizedEntities } from './interface';

export interface SpaceState {
  spaces: string[];
  spaceEntities: NormalizedEntities<ISpace>;
  pageEntities: NormalizedEntities<IPage>;
  pageBlockEntities: NormalizedEntities<IPageBlock>;
}

const defaultSpaceState = {
  spaces: [],
  spaceEntities: {},
  pageEntities: {},
  pageBlockEntities: {},
};

function mergeSpaceInState(space: ISpace) {
  return function (state: SpaceState) {
    return {
      ...state,
      spaceEntities: {
        ...state.spaceEntities,
        [space.id]: {
          ...state.spaceEntities[space.id],
          ...space,
        },
      },
    };
  };
}

function mergePageInState(page: IPage) {
  return function (state: SpaceState): SpaceState {
    return {
      ...state,
      pageEntities: {
        ...state.pageEntities,
        [page.id]: {
          ...state.pageEntities[page.id],
          ...page,
        },
      },
    };
  };
}

function reduceSpaceList(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  const normalizedData = normalize<ISpace>(action.payload.data, SpaceListSchema);
  return {
    ...state,
    spaces: normalizedData.result,
    spaceEntities: normalizedData.entities.spaces,
  };
}

function mergePageEntities(pageEntities: NormalizedEntities<IPage>) {
  return function (state: SpaceState): SpaceState {
    return Object.keys(pageEntities).reduce((state: SpaceState, id: string): SpaceState => {
      return {
        ...state,
        pageEntities: {
          ...state.pageEntities,
          [id]: {
            ...state.pageEntities[id],
            ...pageEntities[id],
          },
        },
      };
    }, state);
  };
}

function reducePageList(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  const spaceId = action.meta.previousAction.meta.spaceId;
  const space = state.spaceEntities[spaceId];
  if (!space) {
    AppLogger.error(`space not found in state, [action] = `, action);
    return state;
  }
  const spaceWithPages: ISpace = { ...space, pages: action.payload.data as IPage[] };
  const normalizedData = normalize(spaceWithPages, SpaceSchema);
  return buildStateWorker<SpaceState>(state).pipe(
    mergeSpaceInState(normalizedData.entities.spaces[normalizedData.result]),
    mergePageEntities(normalizedData.entities.pages)
  );
}

function reducePageDetail(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  const normalizedData = normalize(action.payload.data, PageSchema);
  return buildStateWorker<SpaceState>(state).pipe(
    mergePageInState(normalizedData.entities.pages[normalizedData.result]),
    (state: SpaceState): SpaceState => {
      return {
        ...state,
        pageBlockEntities: {
          ...state.pageBlockEntities,
          ...normalizedData.entities.blocks,
        },
      };
    }
  );
}

export function SpaceReducer(
  state: SpaceState = defaultSpaceState,
  action: AxiosSuccessAction | AppAction
): SpaceState {
  switch (action.type) {
    case 'QUERY_SPACE_LIST_SUCCESS':
      return reduceSpaceList(state, action as AxiosSuccessAction);

    case 'QUERY_PAGE_LIST_SUCCESS':
      return reducePageList(state, action as AxiosSuccessAction);

    case 'QUERY_PAGE_DETAIL_SUCCESS':
      return reducePageDetail(state, action as AxiosSuccessAction);

    default:
      return state;
  }
}
