import { AppRootState } from '../reducer';
import { IPage, IPageDetail } from '../../domain/page';
import { denormalize } from 'normalizr';
import { PageListSchema, PageSchema } from '../normalizr';

export function selectPageList(state: AppRootState, spaceId: string): IPage[] | null {
  const space = state.space.spaceEntities[spaceId];
  if (!space) {
    return null;
  }
  return denormalize(space.pages, PageListSchema, {
    pages: state.space.pageEntities,
  });
}

export function selectPage(state: AppRootState, pageId: string): IPageDetail | null {
  return denormalize(state.space.pageEntities[pageId], PageSchema, {
    pages: state.space.pageEntities,
    blocks: state.space.pageBlockEntities,
  });
}
