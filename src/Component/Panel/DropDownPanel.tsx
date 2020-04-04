import React, { ReactNode } from 'react';

export function DropDownPanel(props: { children: ReactNode }) {
  return (
    <div
      style={{
        boxShadow: '0 4px 8px -2px rgba(9,30,66,.25), 0 0 1px rgba(9,30,66,.31)',
        backgroundColor: 'white'
      }}
    >
      {props.children}
    </div>
  );
}
