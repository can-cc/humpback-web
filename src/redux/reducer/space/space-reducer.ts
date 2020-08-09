import { AppAction, AxiosSuccessAction } from '../../action/action';
import { ISpace } from '../../../domain/space';
import { IPage, IPageBlock, IPageDetail } from '../../../domain/page';
import { NormalizedEntities } from '../interface';
import { CreatePageBlockRequest, MovePageBlockRequest } from '../../action/page-block-action';
import {
  reduceCreatePageBlock,
  reduceCreatePageBlockSuccess,
  reduceDeletePageBlock,
  reduceMovePageBlock,
  reducePageDetail,
  reducePageListSuccess,
  reduceSpaceList,
  reduceUpdatePage
} from './reducers';
import { UpdatePageRequest } from '../../action/page-action';

export interface SpaceState {
  spaces: string[];
  spaceEntities: NormalizedEntities<ISpace>;
  pageEntities: NormalizedEntities<IPage & IPageDetail>;
  pageBlockEntities: NormalizedEntities<IPageBlock>;
}

const defaultSpaceState = {
  spaces: [],
  spaceEntities: {},
  pageEntities: {},
  pageBlockEntities: {}
};

export function SpaceReducer(
  state: SpaceState = defaultSpaceState,
  action: AxiosSuccessAction | AppAction
): SpaceState {
  try {
    switch (action.type) {
      case 'QUERY_SPACE_LIST_SUCCESS':
        return reduceSpaceList(state, action);

      case 'QUERY_PAGE_LIST_SUCCESS':
        return reducePageListSuccess(state, action);

      case 'QUERY_PAGE_DETAIL_SUCCESS':
        return reducePageDetail(state, action);

      case 'CREATE_PAGE_BLOCK':
        return reduceCreatePageBlock(state, action as ReturnType<typeof CreatePageBlockRequest>);

      case 'CREATE_PAGE_BLOCK_SUCCESS':
        return reduceCreatePageBlockSuccess(state, action);

      case 'UPDATE_PAGE':
        return reduceUpdatePage(state, action as ReturnType<typeof UpdatePageRequest>);

      case 'MOVE_PAGE_BLOCK':
        return reduceMovePageBlock(state, action as ReturnType<typeof MovePageBlockRequest>);

      case 'DELETE_PAGE_BLOCK_SUCCESS':
        return reduceDeletePageBlock(state, action as AxiosSuccessAction);

      default:
        return state;
    }
  } catch (e) {
    console.error(`reduce space action failure. [action] = ${action}`);
    console.error(e);
    return state;
  }
}
