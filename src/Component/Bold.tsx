import React, { CSSProperties, ReactNode } from 'react';
import { AppText } from './Typography/AppText';

export function Bold(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <AppText
      style={{
        fontWeight: 'bold',
        ...props.style
      }}
    >
      {props.children}
    </AppText>
  );
}
