import React, { CSSProperties, ReactNode } from 'react';
import { Text } from './Text';

export function Bold(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
}
