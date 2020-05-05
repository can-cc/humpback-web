import { schema } from 'normalizr';

export const PageSchema = new schema.Entity('pages');
export const PageListSchema = new schema.Array(PageSchema);

export const SpaceSchema = new schema.Entity('spaces', {
  pages: PageListSchema,
});
export const SpaceListSchema = new schema.Array(SpaceSchema);
