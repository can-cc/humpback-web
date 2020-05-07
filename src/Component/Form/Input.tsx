import React, { CSSProperties, InputHTMLAttributes } from 'react';
import omit from 'lodash/omit';

export type InputType = 'normal' | 'ghost';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean;
  type?: InputType;
}

const ghostStyle: CSSProperties = {
  border: 'none',
};

export function Input(props: InputProps) {
  const style: CSSProperties = {
    outline: 'none',
    fontSize: 'inherit',
    padding: '8px 8px',
    borderRadius: 6,
    border: '1px solid #e8e8e8',
    width: props.block ? '100%' : 'initial',
    boxSizing: 'border-box',
    ...(props.type === 'ghost' ? ghostStyle : {}),
    ...props.style,
  };

  return <input style={style} {...omit(props, ['style', 'block'])} />;
}
