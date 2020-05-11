import React, { useCallback, useRef, useState } from 'react';
import { IPageBlock } from '../../../../domain/page';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';
import { DragSourceMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { Flex } from '../../../../Component/Flex';
import { IconButton } from '../../../../Component/Button/IconButton';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DropTargetMonitor } from 'react-dnd/lib/interfaces/monitors';

interface SortableEditorBlockProps {
  block: IPageBlock;
  findBlockIndex: Function;
  moveBlock: Function;
  moveBlockEnd: Function;
  updateBlock: Function;
  createBlock: Function;
  isOnly: boolean;
}

interface DragItem {
  type: string;
  id: string;
  originalIndex: string;
}

export const SortableEditorBlock: React.FC<SortableEditorBlockProps> = ({
  block,
  moveBlock,
  moveBlockEnd,
  findBlockIndex,
  updateBlock,
  createBlock,
  isOnly,
}) => {
  const originalIndex = findBlockIndex(block.id);
  const ref = useRef<HTMLDivElement>(null);
  const [editorFocus, setEditorFocus] = useState(false);

  const [, drop] = useDrop({
    accept: 'PageEditorBlock',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.originalIndex;
      const hoverIndex = originalIndex;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current!.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveBlock(item.id, hoverIndex);
      item.originalIndex = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'PageEditorBlock', id: block.id, index: originalIndex },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        moveBlockEnd();
      }
    },
  });

  const onChangeDebounce = useCallback(
    (content) => {
      updateBlock(block.id, content);
    },
    [block.id, updateBlock]
  );

  const opacity = isDragging ? 0.3 : 1;

  drop(preview(ref));
  return (
    <div ref={ref} style={{ opacity }}>
      <Flex alignCenter className="PageEditorBlock-root">
        <div className="PageEditorBlock-operation">
          <IconButton icon={faPlus} onClick={() => createBlock('')} />
          <div style={{ display: 'inline-block' }} ref={drag}>
            <IconButton buttonStyle={{ cursor: '-webkit-grab' }} icon={faEllipsisV} />
          </div>
        </div>
        <RichEditorBlock
          focusInitial={block.focusInitial}
          initContent={block.content}
          onChangeDebounce={onChangeDebounce}
          placeholder={isOnly || editorFocus ? '请输入内容' : ''}
          onFocus={useCallback(() => setEditorFocus(true), [])}
          onBlur={useCallback(() => setEditorFocus(false), [])}
          onReturn={() => {
            createBlock('', block.id);
          }}
        />
      </Flex>
    </div>
  );
};
