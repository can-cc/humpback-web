export enum BlockType {
  Html = "Html",
  Image = "Image"
}

export interface IPage {
  id: string;
  title: string;
}

export interface IPageBlock {
  id: string;
  content: string;
  type: string;
  focusInitial?: boolean;
}

export interface IPageDetail extends IPage {
  blocks: IPageBlock[] | null;
}
