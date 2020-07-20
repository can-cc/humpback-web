import React, { CSSProperties } from 'react';

export function Humpback(props: { style?: CSSProperties, onClick?: () => void }) {
  return (
    <img
      src={require('../asset/humpback.svg')}
      alt="humpback"
      onClick={props.onClick}
      style={{
        width: 98,
        cursor: 'pointer',
        ...props.style,
      }}
    />
  );
}
