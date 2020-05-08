import { AppAction, AxiosSuccessAction } from '../../action/action';
import { ISpace } from '../../../domain/space';
import { IPage, IPageBlock, IPageDetail } from '../../../domain/page';
import { NormalizedEntities } from '../interface';
import { CreatePageBlockRequest } from '../../action/page-block-action';
import {
  reduceCreatePageBlock,
  reduceCreatePageBlockSuccess,
  reducePageDetail,
  reducePageList,
  reduceSpaceList,
} from './reduce-function';

export interface SpaceState {
  spaces: string[];
  spaceEntities: NormalizedEntities<ISpace>;
  pageEntities: NormalizedEntities<IPage | IPageDetail>;
  pageBlockEntities: NormalizedEntities<IPageBlock>;
}

const defaultSpaceState = {
  spaces: [],
  spaceEntities: {},
  pageEntities: {},
  pageBlockEntities: {},
};

export function SpaceReducer(
  state: SpaceState = defaultSpaceState,
  action: AxiosSuccessAction | AppAction
): SpaceState {
  switch (action.type) {
    case 'QUERY_SPACE_LIST_SUCCESS':
      return reduceSpaceList(state, action);

    case 'QUERY_PAGE_LIST_SUCCESS':
      return reducePageList(state, action as AxiosSuccessAction);

    case 'QUERY_PAGE_DETAIL_SUCCESS':
      return reducePageDetail(state, action as AxiosSuccessAction);

    case 'CREATE_PAGE_BLOCK':
      return reduceCreatePageBlock(state, action as ReturnType<typeof CreatePageBlockRequest>);

    case 'CREATE_PAGE_BLOCK_SUCCESS':
      return reduceCreatePageBlockSuccess(state, action);

    default:
      return state;
  }
}
