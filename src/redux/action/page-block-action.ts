import { generateTemporarilyId } from '../../util/id';

export interface CreatePageBlockPayload {
  spaceId: string;
  pageId: string;
  content: string;
  previousBlockId?: string;
}

export function CreatePageBlockRequest(payload: CreatePageBlockPayload) {
  const temporaryId = generateTemporarilyId('page-block');
  return {
    type: 'CREATE_PAGE_BLOCK',
    meta: { ...payload, temporaryId: temporaryId },
    payload: {
      request: {
        url: `/page/${payload.pageId}/block`,
        method: 'post',
        data: payload,
        responseType: 'text',
      },
    },
  };
}

export interface UpdatePageBlockPayload {
  pageId: string;
  spaceId: string;
  blockId: string;
  content: string;
}

export function UpdatePageBlockRequest(payload: UpdatePageBlockPayload) {
  return {
    type: 'UPDATE_PAGE_BLOCK',
    payload: {
      request: {
        url: `/page/${payload.pageId}/block/${payload.blockId}`,
        method: 'put',
        data: payload,
      },
    },
  };
}
