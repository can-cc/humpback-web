import React, { CSSProperties, MutableRefObject, SyntheticEvent } from "react";
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';
import { TextSecondaryColor } from '../../Constant/Color';

export const IconButton = React.forwardRef((props: {
  icon: IconProp | any;
  iconSize?: SizeProp;
  iconStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  onClick?: (e: SyntheticEvent) => void;
}, ref?: MutableRefObject<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
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
          width: 18,
          ...props.iconStyle,
        }}
      />
    </button>
  );
});
