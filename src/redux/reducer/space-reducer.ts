import { AppAction, AxiosSuccessAction } from '../action/action';
import { normalize } from 'normalizr';
import { SpaceListSchema, SpaceSchema } from '../normalizr';
import { ISpace } from '../../domain/space';
import { IPage } from '../../domain/page';
import { AppLogger } from '../../util/logger';
import { buildStateWorker } from './reducer-util';
import { NormalizedEntities } from './interface';

export interface SpaceState {
  spaces: string[];
  spaceEntities: NormalizedEntities<ISpace>;
  pageEntities: NormalizedEntities<IPage>;
}

const defaultSpaceState = {
  spaces: [],
  spaceEntities: {},
  pageEntities: {},
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

function reduceSpaceList(state: SpaceState, action: AxiosSuccessAction): SpaceState {
  const normalizedData = normalize<ISpace>(action.payload.data, SpaceListSchema);
  return {
    ...state,
    spaces: normalizedData.result,
    spaceEntities: normalizedData.entities.spaces,
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
    (state): SpaceState => {
      return {
        ...state,
        pageEntities: {
          ...state.pageEntities,
          ...normalizedData.entities.pages,
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

    default:
      return state;
  }
}
