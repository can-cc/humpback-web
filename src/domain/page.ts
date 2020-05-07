export interface IPage {
  id: string;
  title: string;
}

export interface IPageBlock {
  id: string;
  content: string;
}

export interface IPageDetail extends IPage {
  blocks: IPageBlock[] | null;
}
