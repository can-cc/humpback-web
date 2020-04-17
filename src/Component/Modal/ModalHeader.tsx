import React, { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../Typography/Heading';

interface InputProps {
  title?: string;
  onClose?: () => void;
  children?: ReactNode;
}

export const _ModalHeader = ({ title, onClose, children }: InputProps) => {
  return (
    <div
      className={`ModalHeader`}
      style={{
        padding: '12px',
        borderBottom: '2px solid #ebecf0',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Heading>{title}</Heading>

      {!!onClose && (
        <div style={{}}>
          <Button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </Button>
        </div>
      )}
    </div>
  );
};
