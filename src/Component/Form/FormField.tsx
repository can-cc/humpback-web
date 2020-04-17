import React, { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TextSecondaryColor } from '../../Constant/Color';

interface InputProps {
  name?: string;
  icon?: IconProp;
  children: ReactNode;
  type?: 'inline';
  className?: string;
  require?: boolean;
}

export function FormField({
  name,
  icon,
  children,
  className = '',
  type = 'inline',
  require = false
}: InputProps) {
  return (
    <div className={`FormField ${className}`} style={{
        verticalAlign: 'center'
    }}>
      {name && (
        <span
          className={`FormField--name`}
          style={{
            marginRight: 12,
            color: TextSecondaryColor
          }}
        >
          {name}
          {require && <span className="FormField-flag">*</span>}
        </span>
      )}
      <>{children}</>
    </div>
  );
}
