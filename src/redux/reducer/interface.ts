export type NormalizedEntities<T> = {
  [key in string | number]: T;
};
