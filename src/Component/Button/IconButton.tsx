import React, { CSSProperties, SyntheticEvent } from 'react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';

export function IconButton(props: {
  icon: IconProp | any;
  iconSize?: SizeProp;
  iconStyle?: CSSProperties;
  onClick?: (e: SyntheticEvent) => void;
}) {
  return (
    <button
      className="IconButton"
      style={{
        border: 'none',
        outline: 'none',
        borderRadius: 3,
        padding: '3px 5px',
        color: '#888',
        verticalAlign: 'middle',
      }}
      onClick={props.onClick}
    >
      <FontAwesomeIcon
        size={props.iconSize || 'lg'}
        icon={props.icon}
        style={{
          ...props.iconStyle,
        }}
      />
    </button>
  );
}
