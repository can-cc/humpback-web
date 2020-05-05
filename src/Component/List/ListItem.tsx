import React, { CSSProperties, ReactNode } from 'react';

const clickableStyle: CSSProperties = {
  cursor: 'pointer',
};

export function _ListItem(props: { children: ReactNode; onClick?: () => void }) {
  return (
    <li
      style={{
        fontSize: 14,
        ...(!!props.onClick ? clickableStyle : {}),
      }}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}
