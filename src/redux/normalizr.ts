import { schema } from 'normalizr';

export const PageBlockSchema = new schema.Entity('blocks');
export const PageBlockListSchema = new schema.Array(PageBlockSchema);

export const PageSchema = new schema.Entity('pages', {
  blocks: PageBlockListSchema
});
export const PageListSchema = new schema.Array(PageSchema);

export const SpaceSchema = new schema.Entity('spaces', {
  pages: PageListSchema
});
export const SpaceListSchema = new schema.Array(SpaceSchema);
