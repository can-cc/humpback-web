import React, { LegacyRef } from 'react';
import { IPageBlock } from '../../../../domain/page';
import { useHover } from '../../../../hook/hoverHook';

interface Props {
  block: IPageBlock;
}

export function ImageBlock({ block }: Props) {
  const imageUri = `/api/image/${block.content.split(':')[1]}`;
  const [hoverRef, isHovered] = useHover();

  return (
    <div
      ref={hoverRef as LegacyRef<HTMLDivElement>}
      style={{
        cursor: 'pointer',
        border: isHovered ? '2px solid #999' : '2px solid transparent'
      }}
    >
      <img style={{ maxWidth: '99%' }} src={imageUri} alt={block.id} />
    </div>
  );
}
