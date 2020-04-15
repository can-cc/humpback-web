import React, { ReactNode, CSSProperties } from 'react';

export function List(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <ul
      style={{
        textAlign: 'left',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        ...props.style,
      }}
    >
      {props.children}
    </ul>
  );
}
