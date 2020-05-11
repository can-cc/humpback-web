import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPageBlock, IPageDetail } from '../../../../domain/page';
import { selectPage } from '../../../../redux/selector/page-selector';
import { AppRootState } from '../../../../redux/reducer';
import {
  CreatePageBlockRequest,
  MovePageBlockRequest,
  ResortPageBlockRequest,
  UpdatePageBlockRequest,
} from '../../../../redux/action/page-block-action';
import { EditorArrayContainer } from './EditorArrayContainer';
import { SortableEditorBlock } from './SortableEditorBlock';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import './PageEditor.css';

export function PageEditor(props: { spaceId: string; pageId: string }) {
  const dispatch = useDispatch();
  const pageDetail = useSelector((state: AppRootState) => selectPage(state, props.pageId)) as IPageDetail | undefined;

  const createBlock = useCallback(
    (content: string, previousBlockId?: string) => {
      dispatch(
        CreatePageBlockRequest({
          spaceId: props.spaceId,
          pageId: props.pageId,
          content,
          previousBlockId,
        })
      );
    },
    [dispatch, props.pageId, props.spaceId]
  );

  const updateBlock = (blockId: string, content: string) => {
    dispatch(
      UpdatePageBlockRequest({
        spaceId: props.spaceId,
        pageId: props.pageId,
        blockId,
        content: content,
      })
    );
  };

  const findBlockIndex = (id: string): number => {
    if (!pageDetail.blocks) {
      return -1;
    }
    return pageDetail.blocks.findIndex((b) => b.id === id);
  };

  const moveBlock = (blockId: string, atIndex: number) => {
    dispatch(MovePageBlockRequest({ blockId, atIndex, pageId: props.pageId }));
  };

  const moveBlockEnd = () => {
    dispatch(
      ResortPageBlockRequest({
        spaceId: props.spaceId,
        pageId: props.pageId,
        blockIds: pageDetail.blocks.map((b) => b.id),
      })
    );
  };

  useEffect(() => {
    if (pageDetail && pageDetail.blocks === null) {
      createBlock('');
    }
  }, [createBlock, pageDetail]);

  return (
    <div
      className="PageEditor"
      style={{
        width: '100%',
      }}
    >
      <DndProvider backend={Backend}>
        <EditorArrayContainer>
          {pageDetail.blocks &&
            pageDetail.blocks.map((block: IPageBlock) => {
              return (
                <SortableEditorBlock
                  key={block.id}
                  block={block}
                  findBlockIndex={findBlockIndex}
                  moveBlockEnd={moveBlockEnd}
                  moveBlock={moveBlock}
                  createBlock={createBlock}
                  updateBlock={updateBlock}
                />
              );
            })}
        </EditorArrayContainer>
      </DndProvider>
    </div>
  );
}
