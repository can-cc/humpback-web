import { AppRootState } from '../reducer';
import { denormalize } from 'normalizr';
import { SpaceListSchema } from '../normalizr';
import { ISpace } from '../../typing/space';

export function selectSpaceList(state: AppRootState): ISpace[] {
  return denormalize(state.space.spaces, SpaceListSchema, {
    spaces: state.space.spaceEntities
  });
}

export function selectSpaceById(state: AppRootState, spaceId: string): ISpace | undefined {
  return state.space.spaceEntities[spaceId];
}
