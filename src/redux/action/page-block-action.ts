import { generateTemporarilyId } from '../../util/id';
import { IPageDetail } from '../../domain/page';
import { AppLogger } from '../../util/logger';

export interface CreatePageBlockPayload {
  spaceId: string;
  pageId: string;
  content: string;
  previousBlockId?: string;
  focusInitial: boolean;
}

export function CreatePageBlockRequest(payload: CreatePageBlockPayload) {
  const temporaryId = generateTemporarilyId('temporary-page-block');
  return {
    type: 'CREATE_PAGE_BLOCK',
    meta: { ...payload, temporaryId: temporaryId },
    payload: {
      request: {
        url: `/page/${payload.pageId}/block`,
        method: 'post',
        data: payload,
        responseType: 'text'
      }
    }
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
        data: payload
      }
    }
  };
}

export interface MovePageBlockPayload {
  pageDetail: IPageDetail;
  blockId: string;
  destinationIndex: number;
  spaceId: string;
}

export function MovePageBlockRequest(payload: MovePageBlockPayload) {
  const pageDetail: IPageDetail = payload.pageDetail;
  let blocks = Array.from(pageDetail.blocks || []);

  const draggedBlock = blocks.find(b => b.id === payload.blockId);
  const draggedBlockIndex = blocks.findIndex(b => b.id === payload.blockId);
  if (draggedBlockIndex < 0) {
    AppLogger.error(new Error(`moving block not exist.`));
  } else {
    blocks.splice(draggedBlockIndex, 1);
    blocks.splice(payload.destinationIndex, 0, draggedBlock);
  }
  return {
    type: 'MOVE_PAGE_BLOCK',
    payload: {
      pageId: pageDetail.id,
      blockId: payload.blockId,
      resortedBlocks: blocks,
      request: {
        url: `/page/${pageDetail.id}/blocks/resort`,
        method: 'post',
        data: {
          pageId: pageDetail.id,
          spaceId: payload.spaceId,
          blockIds: blocks.map(b => b.id)
        }
      }
    }
  };
}

export function UploadPageImageRequest(payload: { pageId: string; spaceId: string; previousBlockId?: string; data }) {
  const formData = new FormData();
  formData.append('data', payload.data);
  formData.append('spaceId', payload.spaceId);
  formData.append('previousBlockId', payload.previousBlockId);
  return {
    type: 'UPDATE_PAGE_BLOCK',
    payload: {
      request: {
        url: `/page/${payload.pageId}/block/image`,
        method: 'post',
        data: formData
      }
    }
  };
}

export function DeleteBlockRequest(payload: { pageId: string; blockId: string }) {
  return {
    type: 'DELETE_PAGE_BLOCK',
    payload: {
      pageId: payload.pageId,
      blockId: payload.blockId,
      request: {
        url: `/page/${payload.pageId}/block/${payload.blockId}`,
        method: 'delete'
      }
    }
  };
}
