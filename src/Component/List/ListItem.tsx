import React, { ReactNode } from 'react';

export function ListItem(props: { children: ReactNode; clickable?: boolean }) {
  return (
    <li
      style={{
        fontSize: 14,
      }}
    >
      {props.children}
    </li>
  );
}
