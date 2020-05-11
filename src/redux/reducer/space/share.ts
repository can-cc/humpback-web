import { IPage, IPageDetail } from '../../../domain/page';
import { normalize } from 'normalizr';
import { PageSchema } from '../../normalizr';
import { buildStateWorker } from '../reducer-util';
import { SpaceState } from './space-reducer';
import { ISpace } from '../../../domain/space';

export function mergePageToState(page: IPage) {
  return function(state: SpaceState): SpaceState {
    return {
      ...state,
      pageEntities: {
        ...state.pageEntities,
        [page.id]: {
          ...state.pageEntities[page.id],
          ...page
        }
      }
    };
  };
}

export function mergePageDetailToState(state: SpaceState, page: IPageDetail): SpaceState {
  const normalizedData = normalize(page, PageSchema);
  return buildStateWorker<SpaceState>(state).pipe(
    mergePageToState(normalizedData.entities.pages[normalizedData.result]),
    (state: SpaceState): SpaceState => {
      return {
        ...state,
        pageBlockEntities: {
          ...state.pageBlockEntities,
          ...normalizedData.entities.blocks
        }
      };
    }
  );
}

export function mergeSpaceInState(space: ISpace) {
  return function(state: SpaceState) {
    return {
      ...state,
      spaceEntities: {
        ...state.spaceEntities,
        [space.id]: {
          ...state.spaceEntities[space.id],
          ...space
        }
      }
    };
  };
}
