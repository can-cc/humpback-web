import React from 'react';
import { Modal } from '../../../../Component/Modal/Modal';
import { List, ListItem } from '../../../../Component/List/List';
import { Button } from '../../../../Component/Button/Button';
import { Icon } from '../../../../Component/Icon';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { DeleteBlockRequest } from '../../../../redux/action/page-block-action';

export function MoreBlockMenu({ belongBlockId, pageId, isOpen, closeModal, afterOpenModal, position }) {
  const dispatch = useDispatch();
  const deleteBlock = () => {
    dispatch(DeleteBlockRequest({ pageId: pageId, blockId: belongBlockId }));
    closeModal();
  };
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
    >
      <List>
        <ListItem>
          <Button style={{ color: 'red' }} onClick={deleteBlock}>
            <Icon icon={faTrashAlt} />
            删除
          </Button>
        </ListItem>
      </List>
    </Modal>
  );
}
