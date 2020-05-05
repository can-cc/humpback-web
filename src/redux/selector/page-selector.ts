import { AppRootState } from '../reducer';
import { IPage } from '../../domain/page';
import { denormalize } from 'normalizr';
import { PageListSchema } from '../normalizr';

export function selectPageList(state: AppRootState, spaceId: string): IPage[] | null {
  const space = state.space.spaceEntities[spaceId];
  if (!space) {
    return null;
  }
  return denormalize(space.pages, PageListSchema, {
    pages: state.space.pageEntities,
  });
}
