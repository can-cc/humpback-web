import React from 'react';
import { IconButton } from '../../Button/IconButton';

export function ToolbarButton({ icon, onClick }) {
  return (
    <IconButton
      icon={icon}
      onClick={onClick}
      buttonStyle={{
        marginRight: 3
      }}
    />
  );
}
