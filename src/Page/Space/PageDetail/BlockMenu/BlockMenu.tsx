import React from 'react';
import { Modal } from '../../../../Component/Modal/Modal';

export function BlockMenu({ isOpen, closeModal, afterOpenModal, position }) {
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
      <h2>Hello</h2>
      <button onClick={closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
}
