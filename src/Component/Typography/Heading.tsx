import React, { CSSProperties, ReactNode } from 'react';
import { AppText } from './AppText';
import { TextPrimaryColor } from '../../Constant/Color';

export function Heading(props: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <AppText
      className={props.className}
      style={{
        fontSize: 20,
        color: TextPrimaryColor,
        ...props.style
      }}
    >
      {props.children}
    </AppText>
  );
}
