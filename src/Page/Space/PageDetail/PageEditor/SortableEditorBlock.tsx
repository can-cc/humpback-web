import React, { createRef, MutableRefObject, useCallback, useRef, useState } from "react";
import { IPageBlock } from '../../../../domain/page';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';
import { Flex } from '../../../../Component/Flex';
import { IconButton } from '../../../../Component/Button/IconButton';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';
import { useHover } from '../../../../hook/hoverHook';

interface SortableEditorBlockProps {
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

export function DraggableEditorBlock({
  block,
  index,
  updateBlock,
  isDraggingOver, createBlock,
  onOpenAddMenu,
  onOpenMoreMenu,
  isOnly
}: SortableEditorBlockProps) {
  const [editorFocus, setEditorFocus] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const menuButtonRef = createRef<HTMLDivElement>();
  const addButtonRef = createRef<HTMLDivElement>();

  const onMenuDivClick = () => {
    const menuButtonRect = menuButtonRef.current.getBoundingClientRect();
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
                <IconButton icon={faPlus} onClick={() => {
                  onOpenAddMenu('', block.id, addButtonRef.current.getBoundingClientRect())
                }} />
              </div>

              <div ref={menuButtonRef} style={{ display: 'inline-block', cursor: '-webkit-grab' }}>
                <IconButton icon={faEllipsisV} onClick={onMenuDivClick} />
              </div>
            </div>
            <RichEditorBlock
              focusInitial={block.focusInitial}
              initContent={block.content}
              onChangeDebounce={onChangeDebounce}
              placeholder={isOnly || editorFocus ? '请输入内容' : ''}
              onFocus={() => setEditorFocus(true)}
              onBlur={() => setEditorFocus(false)}
              onReturn={() => {
                createBlock('', block.id);
              }}
            />
          </Flex>
        </div>
      )}
    </Draggable>
  );
}
