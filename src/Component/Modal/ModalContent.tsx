import React, { CSSProperties, ReactNode } from 'react';

export function _ModalContent(props: { style?: CSSProperties; children: ReactNode }) {
  return (
    <div
      style={{
        padding: '18px 12px',
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
}
