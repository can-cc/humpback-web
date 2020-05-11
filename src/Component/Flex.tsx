import React, { CSSProperties, ReactNode } from 'react';

export function Flex(props: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  alignCenter?: boolean;
  spaceBetween?: boolean;
}) {
  return (
    <div
      className={props.className}
      style={{
        display: 'flex',
        ...(props.alignCenter
          ? {
              alignItems: 'center'
            }
          : {}),
        ...(props.spaceBetween
          ? {
              justifyContent: 'space-between'
            }
          : {}),
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
}
