import React, { CSSProperties, SyntheticEvent } from 'react';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';
import { TextSecondaryColor } from '../../Constant/Color';

export function IconButton(props: {
  icon: IconProp | any;
  iconSize?: SizeProp;
  iconStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
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
        color: TextSecondaryColor,
        cursor: 'pointer',
        verticalAlign: 'middle',
        ...props.buttonStyle,
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
