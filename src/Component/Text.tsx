import React, { ReactNode, CSSProperties } from 'react';

export function Text(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        ...props.style,
      }}
    >
      {props.children}
    </span>
  );
}
