import React from 'react';
import { Modal } from '../../../../Component/Modal/Modal';
import { List, ListItem } from "../../../../Component/List/List";
import { Button } from "../../../../Component/Button/Button";
import { Icon } from "../../../../Component/Icon";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export function MoreBlockMenu({ belongBlockId, isOpen, closeModal, afterOpenModal, position }) {
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
          bottom: "unset",
          right: "unset",
          transform: "unset"
        }
      }}

      contentLabel="Example Modal"
    >
      <List>
        <ListItem>
          <Button style={{color: 'red'}} onClick={() => {}}>
            <Icon icon={faTrashAlt} />
            删除
          </Button>
        </ListItem>

      </List>
    </Modal>
  );
}
