export interface CreatePagePayload {
  spaceId: string;
  title: string;
}

export function CreatPageRequest(payload: CreatePagePayload) {
  return {
    type: 'CREATE_PAGE',
    payload: {
      request: {
        url: `/page`,
        method: 'post',
        data: payload,
      },
    },
  };
}

interface QueryPagePayload {
  spaceId: string;
}

export function QueryPageListRequest(payload: QueryPagePayload) {
  return {
    type: 'QUERY_PAGE_LIST',
    meta: payload,
    payload: {
      request: {
        url: `/space/${payload.spaceId}/pages`,
        method: 'get',
      },
    },
  };
}
