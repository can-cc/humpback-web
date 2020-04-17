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
