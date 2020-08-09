import React from 'react';
import { Modal } from '../Modal';

export interface ImageModel {
  url: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  images: ImageModel[];
  initIndex: number;
  closeModal: Function;
}

export function ImageModal({ isOpen, images, initIndex, closeModal }: Props) {
  const image = images[initIndex];

  return (
    <Modal
      className="ImageModal"
      isOpen={isOpen}
      onRequestClose={() => closeModal()}
      style={{
        content: {
          maxWidth: '90%'
        }
      }}
    >
      <div style={{ padding: 12 }}>
        <img style={{ maxWidth: '100%' }} src={image.url} alt={image.name} />
      </div>
    </Modal>
  );
}
