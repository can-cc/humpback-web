import React from 'react';

export function List({ children }) {
  return (
    <ul
      style={{
        listStyle: 'none',
      }}
    >
      {children}
    </ul>
  );
}
