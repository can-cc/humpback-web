import React, { CSSProperties, ReactNode } from 'react';

export function _ModalFooter(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="ModalFooter"
      style={{
        padding: 12,
        borderTop: '2px solid #ebecf0',
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
}
