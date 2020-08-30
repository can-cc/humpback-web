import React, { LegacyRef, useState } from 'react';
import { IPageBlock } from '../../../../typing/page';
import { useHover } from '../../../../hook/hoverHook';
import { ImageModal } from '../../../../Component/Modal/ImageModal/ImageModal';

interface Props {
  block: IPageBlock;
}

export function ImageBlock({ block }: Props) {
  const imageUri = `/api/image/${block.content.split(':')[1]}`;
  const [hoverRef, isHovered] = useHover();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [{ url: imageUri, name: '' }];

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        ref={hoverRef as LegacyRef<HTMLDivElement>}
        style={{
          cursor: 'pointer',
          border: isHovered ? '2px solid #999' : '2px solid transparent',
          borderRadius: 6,
          overflow: 'hidden'
        }}
      >
        <img style={{ maxWidth: '99%' }} src={imageUri} alt={block.id} />
      </div>

      <ImageModal isOpen={isModalOpen} images={images} initIndex={0} closeModal={() => setIsModalOpen(false)} />
    </>
  );
}
