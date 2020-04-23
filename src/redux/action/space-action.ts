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
        data: payload,
      },
    },
  };
}

export interface GetSpaceListPayload {}

export function GetSpaceListRequest(payload: GetSpaceListPayload) {
  return {
    type: 'GET_SPACE_LIST',
    payload: {
      request: {
        url: `/spaces`,
        withCredentials: true
      },
    },
  };
}
