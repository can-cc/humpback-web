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
        withCredentials: true,
        data: payload,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
        withCredentials: true,
        headers: {
          // 'X-Requested-With': 'XMLHttpRequest',
        },
      },
    },
  };
}
