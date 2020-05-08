import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPageBlock, IPageDetail } from '../../../../domain/page';
import { selectPage } from '../../../../redux/selector/page-selector';
import { AppRootState } from '../../../../redux/reducer';
import {
  CreatePageBlockRequest,
  MovePageBlockPayload,
  UpdatePageBlockRequest,
} from '../../../../redux/action/page-block-action';
import { EditorArrayContainer } from './EditorArrayContainer';
import { SortableEditorBlock } from './SortableEditorBlock';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

export function PageEditor(props: { spaceId: string; pageId: string }) {
  const dispatch = useDispatch();
  const pageDetail = useSelector((state: AppRootState) => selectPage(state, props.pageId)) as IPageDetail | undefined;

  const createBlock = (content: string, previousBlockId?: string) => {
    dispatch(
      CreatePageBlockRequest({
        spaceId: props.spaceId,
        pageId: props.pageId,
        content,
        previousBlockId,
      })
    );
  };

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
    dispatch(MovePageBlockPayload({ blockId, atIndex, pageId: props.pageId }));
  };
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
