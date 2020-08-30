import { IPage } from './page';

export interface ISpace {
  name: string;
  id: string;
  pages?: IPage[] | string[];
}
