import React, { ReactNode } from 'react';
import { ColorErrorMessage } from '../../Constant/Color';

export function FormErrorMessage(props: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        marginTop: 6,
        color: ColorErrorMessage,
      }}
    >
      {props.children}
    </div>
  );
}
