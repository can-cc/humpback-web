export interface CreateSpacePayload {
  name: string;
}

export function CreateSpaceRequest(payload: CreateSpacePayload) {
  return {
    type: 'CREATE_SPACE',
    payload: {
      request: {
        url: `/space`,
        method: 'post',
        data: payload
      }
    }
  };
}

export interface QuerySpaceListPayload {}

export function QuerySpaceListRequest(payload: QuerySpaceListPayload) {
  return {
    type: 'QUERY_SPACE_LIST',
    payload: {
      request: {
        url: `/spaces`
      }
    }
  };
}
