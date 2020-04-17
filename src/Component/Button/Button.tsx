import React, {
  CSSProperties,
  SyntheticEvent,
  ReactNode,
  MutableRefObject,
} from 'react';
import {
  ColorPrimary,
  ColorPrimaryoOpposite,
  ColorPrimaryHover,
  ColorLink,
  ColorDisable,
  TextSecondaryColor,
} from '../../Constant/Color';
import { buildClassName } from '../../util/component';
import { useHover } from '../../hook/hoverHook';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'link'
  | 'default';

interface Props {
  children: ReactNode;
  htmlType?: 'submit' | 'reset' | 'button';
  type?: ButtonType;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  backgroundColor?: string;
  disabled?: boolean;
  className?: string;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const typeStyles = {
  primary: {
    backgroundColor: ColorPrimary,
    color: ColorPrimaryoOpposite,
  },
  link: {
    color: ColorLink,
  },
};

const typeHoverStyles: { [name: string]: CSSProperties } = {
  primary: {
    backgroundColor: ColorPrimaryHover,
  },
  link: {
    textDecoration: 'underline',
  },
};

const sizeStyles = {
  md: {
    padding: '0 12px',
    height: 32,
    lineHeight: '31px',
    fontSize: 16,
    borderRadius: 6,
  },
};

export function Button({
  children,
  htmlType = 'button',
  type = 'default',
  onClick,
  size = 'md',
  className,
  disabled,
  style,
  backgroundColor = 'transparent',
}: Props) {
  const allClassName = buildClassName(['Button', type, className]);
  const [hoverRef, isHovered] = useHover();
  const hoverStyle = isHovered ? typeHoverStyles[type] : {};

  return (
    <button
      ref={hoverRef as MutableRefObject<HTMLButtonElement>}
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        border: 0,
        cursor: 'pointer',
        outline: 'none',
        boxSizing: 'border-box',
        ...typeStyles[type],
        ...hoverStyle,
        ...sizeStyles[size],
        ...( disabled ? {
          backgroundColor: ColorDisable,
          color: TextSecondaryColor
        }: {}),
        ...style,
      }}
      className={allClassName}
      type={htmlType}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
