import React, { useEffect, useCallback, useState } from "react";
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
import { MoreBlockMenu } from "../BlockMenu/MoreBlockMenu";
import { AddBlockMenu } from "../BlockMenu/AddBlockMenu";

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey'
});

export function PageEditor(props: { spaceId: string; pageId: string; isNew: boolean }) {
  const { spaceId, pageId } = props;
  const dispatch = useDispatch();

  const [isMoreBlockMenuOpen, setIsMoreBlockMenuOpen] = useState(false);
  const [isAddBlockMenuOpen, setIsAddBlockMenuOpen] = useState(false);
  const [moreMenuModalPosition, setMoreMenuModalPosition] = useState({top: 0, left: 0});
  const [addMenuModalPosition, setAddMenuModalPosition] = useState({top: 0, left: 0});


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
                      updateBlock={updateBlock}
                      createBlock={createBlock}
                      onOpenAddMenu={createBlock}
                      onOpenMoreMenu={(rect: DOMRect) => {
                        setIsMoreBlockMenuOpen(true);
                        setMoreMenuModalPosition({top: rect.top, left: rect.left})
                      }}
                      isOnly={pageDetail.blocks.length === 1}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <MoreBlockMenu
        isOpen={isMoreBlockMenuOpen}
        closeModal={() => setIsMoreBlockMenuOpen(false)}
        afterOpenModal={() => {}}
        position={{
          top: moreMenuModalPosition.top,
          left: moreMenuModalPosition.left
        }}
      />
      <AddBlockMenu
        isOpen={isAddBlockMenuOpen}
        closeModal={() => setIsAddBlockMenuOpen(false)}
        afterOpenModal={() => {}}
        position={{
          top: addMenuModalPosition.top,
          left: addMenuModalPosition.left
        }}
      />
    </div>
  );
}
