import React, { createRef, MutableRefObject, useCallback, useState } from 'react';
import { IPageBlock } from '../../../../domain/page';
import { Flex } from '../../../../Component/Flex';
import { IconButton } from '../../../../Component/Button/IconButton';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';
import { useHover } from '../../../../hook/hoverHook';
import { Block } from './Block';

interface Props {
  block: IPageBlock;
  index: number;
  updateBlock: Function;
  onOpenAddMenu: Function;
  createBlock: Function;
  onOpenMoreMenu: (rect: DOMRect) => void;
  isOnly: boolean;
  isDraggingOver: boolean;
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  // background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle
});

export function SortableBlock({
  block,
  index,
  updateBlock,
  isDraggingOver,
  createBlock,
  onOpenAddMenu,
  onOpenMoreMenu,
  isOnly
}: Props) {
  const [hoverRef, isHovered] = useHover();
  const moreButtonRef = createRef<HTMLDivElement>();
  const addButtonRef = createRef<HTMLDivElement>();

  const onMenuDivClick = () => {
    const menuButtonRect = moreButtonRef.current.getBoundingClientRect();
    onOpenMoreMenu(menuButtonRect);
  };

  const onChangeDebounce = useCallback(
    content => {
      updateBlock(block.id, content);
    },
    [block.id, updateBlock]
  );

  return (
    <Draggable key={block.id} draggableId={block.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <Flex alignCenter ref={hoverRef as MutableRefObject<HTMLDivElement>} className="PageEditorBlock-root">
            <div
              {...provided.dragHandleProps}
              className="PageEditorBlock-operation"
              style={{
                visibility: snapshot.isDragging
                  ? 'visible'
                  : isDraggingOver
                  ? 'hidden'
                  : isHovered
                  ? 'visible'
                  : 'hidden',
                cursor: '-webkit-grab'
              }}
            >
              <div ref={addButtonRef} style={{ display: 'inline-block' }}>
                <IconButton
                  icon={faPlus}
                  onClick={() => {
                    onOpenAddMenu(addButtonRef.current.getBoundingClientRect());
                  }}
                />
              </div>

              <div ref={moreButtonRef} style={{ display: 'inline-block', cursor: '-webkit-grab' }}>
                <IconButton icon={faEllipsisV} onClick={onMenuDivClick} />
              </div>
            </div>

            <Block block={block} isOnly={isOnly} createBlock={createBlock} onChangeDebounce={onChangeDebounce} />
          </Flex>
        </div>
      )}
    </Draggable>
  );
}
