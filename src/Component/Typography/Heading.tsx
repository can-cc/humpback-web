import React, { CSSProperties, ReactNode } from 'react';
import { Text } from '../Text';
import { TextPrimaryColor } from '../../Constant/Color';

export function Heading(props: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <Text
      className={props.className}
      style={{
        fontSize: 20,
        color: TextPrimaryColor,
        ...props.style
      }}
    >
      {props.children}
    </Text>
  );
}
