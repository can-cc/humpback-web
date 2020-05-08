import React from 'react';
import { IPageBlock } from '../../../../domain/page';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';
import { useDrag, useDrop } from 'react-dnd';

interface SortableEditorBlockProps {
  block: IPageBlock;
  findBlockIndex: Function;
  moveBlock: Function;
  updateBlock: Function;
  createBlock: Function;
}

interface DragItem {
  type: string;
  id: string;
  originalIndex: string;
}

export const SortableEditorBlock: React.FC<SortableEditorBlockProps> = ({
  block,
  moveBlock,
  findBlockIndex,
  updateBlock,
  createBlock,
}) => {
  const originalIndex = findBlockIndex(block.id);
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'PageEditorBlock', id: block.id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveBlock(droppedId, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: 'PageEditorBlock',
    canDrop: () => false,
    hover({ id: draggedId }: DragItem) {
      if (draggedId !== block.id) {
        const index = findBlockIndex(block.id);
        moveBlock(draggedId, index);
      }
    },
  });

  const opacity = isDragging ? 0.3 : 1;
  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      <RichEditorBlock
        isNew={!!block.id}
        initContent={block.content}
        onChangeDebounce={(content) => {
          updateBlock(block.id, content);
        }}
        handleReturn={() => {
          createBlock('', block.id);
        }}
      />
    </div>
  );
};
