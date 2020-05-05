import React, { CSSProperties, ReactNode } from 'react';

export function Text(props: { children: ReactNode; style?: CSSProperties; className?: string; inline?: string }) {
  const Ele = props.inline ? (p) => <span {...p} /> : (p) => <div {...p} />;
  return (
    <Ele
      className={props.className}
      style={{
        ...props.style,
      }}
    >
      {props.children}
    </Ele>
  );
}
