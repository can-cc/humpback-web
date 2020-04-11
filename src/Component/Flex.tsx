import React, { CSSProperties, ReactNode } from 'react';

export function Flex(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', ...props.style }}>{props.children}</div>
  );
}
