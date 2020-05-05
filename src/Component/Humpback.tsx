import React, { CSSProperties } from 'react';

export function Humpback(props: { style?: CSSProperties }) {
  return (
    <img
      src={require('../asset/humpback.svg')}
      alt="humpback"
      style={{
        width: 120,
        ...props.style,
      }}
    />
  );
}
