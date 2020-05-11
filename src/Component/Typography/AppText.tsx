import React, { CSSProperties, ReactNode } from 'react';
import { TextPrimaryColor } from '../../Constant/Color';

export function AppText(props: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  inline?: boolean;
  bold?: boolean;
  size?: number;
  ellipsis?: boolean;
  hoverTitle?: string;
}) {
  const Ele = props.inline ? p => <span {...p} /> : p => <div {...p} />;
  return (
    <Ele
      className={props.className}
      title={props.hoverTitle}
      style={{
        color: TextPrimaryColor,
        fontSize: props.size,
        ...(props.ellipsis
          ? {
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          : {}),
        ...(props.bold
          ? {
              fontWeight: 'bold'
            }
          : {}),
        ...props.style
      }}
    >
      {props.children}
    </Ele>
  );
}
