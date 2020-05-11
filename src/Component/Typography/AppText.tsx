import React, { CSSProperties, ReactNode } from 'react';
import { TextPrimaryColor } from '../../Constant/Color';

export function AppText(props: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  inline?: boolean;
  bold?: boolean;
  size?: number;
}) {
  const Ele = props.inline ? (p) => <span {...p} /> : (p) => <div {...p} />;
  return (
    <Ele
      className={props.className}
      style={{
        color: TextPrimaryColor,
        fontSize: props.size,
        ...(props.bold
          ? {
              fontWeight: 'bold',
            }
          : {}),
        ...props.style,
      }}
    >
      {props.children}
    </Ele>
  );
}
