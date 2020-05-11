import React, { CSSProperties, ReactNode } from 'react';

export function _ListSection(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        padding: 8,
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
}
