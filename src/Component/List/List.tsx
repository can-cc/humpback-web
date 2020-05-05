import React, { CSSProperties, ReactNode } from 'react';

import { _ListItem } from './ListItem';
import { _ListSection } from './ListSection';

export const ListItem = _ListItem;
export const ListSection = _ListSection;

export function List(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <ul
      style={{
        textAlign: 'left',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        ...props.style,
      }}
    >
      {props.children}
    </ul>
  );
}
