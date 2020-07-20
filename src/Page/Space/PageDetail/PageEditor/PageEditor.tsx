import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPageBlock, IPageDetail } from '../../../../domain/page';
import { selectPage } from '../../../../redux/selector/page-selector';
import { AppRootState } from '../../../../redux/reducer';
import {
  CreatePageBlockRequest,
  MovePageBlockRequest,
  UpdatePageBlockRequest
} from '../../../../redux/action/page-block-action';
import { DraggableEditorBlock } from './SortableEditorBlock';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './PageEditor.css';

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey'
});

export function PageEditor(props: { spaceId: string; pageId: string; isNew: boolean }) {
  const { spaceId, pageId } = props;
  const dispatch = useDispatch();
  const pageDetail = useSelector((state: AppRootState) => selectPage(state, pageId)) as IPageDetail | undefined;

  const createBlock = useCallback(
    (content: string, previousBlockId?: string, focusInitial = true) => {
      dispatch(
        CreatePageBlockRequest({
          spaceId: spaceId,
          pageId: pageId,
          content,
          previousBlockId,
          focusInitial
        })
      );
    },
    [dispatch, pageId, spaceId]
  );

  const updateBlock = useCallback(
    (blockId: string, content: string) => {
      dispatch(
        UpdatePageBlockRequest({
          spaceId: spaceId,
          pageId: pageId,
          blockId,
          content: content
        })
      );
    },
    [dispatch, pageId, spaceId]
  );

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    dispatch(
      MovePageBlockRequest({  spaceId: spaceId, pageDetail: pageDetail, blockId: result.draggableId, destinationIndex: result.destination.index })
    );
  };

  useEffect(() => {
    if (pageDetail && pageDetail.blocks === null) {
      createBlock('', undefined, false);
    }
  }, [createBlock, pageDetail]);

  return (
    <div
      className="PageEditor"
      style={{
        width: '100%'
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {pageDetail.blocks &&
                pageDetail.blocks.map((block: IPageBlock, index: number) => {
                  return (
                    <DraggableEditorBlock
                      key={block.id}
                      block={block}
                      isDraggingOver={snapshot.isDraggingOver}
                      index={index}
                      createBlock={createBlock}
                      updateBlock={updateBlock}
                      isOnly={pageDetail.blocks.length === 1}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
