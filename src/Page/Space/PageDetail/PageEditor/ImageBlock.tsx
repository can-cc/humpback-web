import React from 'react';
import { IPageBlock } from '../../../../domain/page';

interface Props {
  block: IPageBlock;
}

export function ImageBlock({ block }: Props) {
  const imageUri = `/api/image/${block.content.split(":")[1]}`
  return <img style={{maxWidth: '99%'}} src={imageUri} alt={block.id} />;
}
