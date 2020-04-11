import React, { CSSProperties } from 'react';

export function Divider(props: { style?: CSSProperties }) {
  return (
    <div
      className="DivideLine"
      style={{
        backgroundColor: '#999',
        backgroundPosition: 'bottom',
        position: 'relative',
        width: '100%',
        height: 1,
        ...props.style,
      }}
    ></div>
  );
}
