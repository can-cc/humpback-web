import React, { ReactNode, CSSProperties } from 'react';

export function ListSection(props: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return <div style={{
      padding: 8,
      ...props.style
  }}>{props.children}</div>;
}
