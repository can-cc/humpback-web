import React, { CSSProperties, ReactNode } from 'react';

const clickableStyle: CSSProperties = {
  cursor: 'pointer',
};

const activeStyle: CSSProperties = {
  fontWeight: 'bolder',
};

export function _ListItem(props: { children: ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <li
      style={{
        fontSize: 14,
        lineHeight: 1.6,
        padding: '3px 0',
        ...(!!props.onClick ? clickableStyle : {}),
        ...(props.active ? activeStyle : {}),
      }}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}
