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
        responseType: 'text'
      }
    }
  };
}

export interface QueryPagePayload {
  spaceId: string;
}

export function QueryPageListRequest(payload: QueryPagePayload) {
  return {
    type: 'QUERY_PAGE_LIST',
    meta: payload,
    payload: {
      request: {
        url: `/space/${payload.spaceId}/pages`,
        method: 'get'
      }
    }
  };
}

interface QueryPageDetailPayload {
  spaceId: string;
  pageId: string;
}

export function QueryPageDetailRequest(payload: QueryPageDetailPayload) {
  return {
    type: 'QUERY_PAGE_DETAIL',
    meta: payload,
    payload: {
      request: {
        url: `/space/${payload.spaceId}/page/${payload.pageId}`,
        method: 'get'
      }
    }
  };
}

export interface UpdatePagePayload {
  spaceId: string;
  pageId: string;
  title?: string;
}

export function UpdatePageRequest(payload: UpdatePagePayload) {
  return {
    type: 'UPDATE_PAGE',
    meta: payload,
    payload: {
      request: {
        url: `/page/${payload.pageId}`,
        method: 'patch',
        data: payload
      }
    }
  };
}
