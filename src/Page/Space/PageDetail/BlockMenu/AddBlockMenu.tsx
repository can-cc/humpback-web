import React from 'react';
import { Modal } from '../../../../Component/Modal/Modal';
import { List, ListItem } from '../../../../Component/List/List';
import { Button } from '../../../../Component/Button/Button';
import { ImageUploader } from "../../../../Component/Upload/ImageUploader";

export function AddBlockMenu({ isOpen, closeModal, afterOpenModal, position }) {

  const onImageUpload = (result) => {
    console.log(result);
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'transparent'
        },
        content: {
          top: position.top,
          left: position.left,
          bottom: 'unset',
          right: 'unset',
          transform: 'unset'
        }
      }}
      contentLabel="Example Modal"
    >
      <List>
        <ListItem>
          <Button>文字</Button>
        </ListItem>
        <ListItem>
          <ImageUploader onUpload={onImageUpload}>
            <Button>图片</Button>
          </ImageUploader>
        </ListItem>
      </List>
    </Modal>
  );
}
