export interface CreatePageBlockPayload {
  spaceId: string;
  pageId: string;
  content: string;
}

export function CreatePageBlockRequest(payload: CreatePageBlockPayload) {
  return {
    type: 'CREATE_PAGE_BLOCK',
    meta: payload,
    payload: {
      request: {
        url: `/page/${payload.pageId}/block`,
        method: 'post',
        data: payload,
      },
    },
  };
}
