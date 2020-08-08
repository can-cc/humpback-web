import React from 'react';
import { ToolBarBold } from './Toolbar/ToolBarBold';

export function RichEditorToolBar({ isOpen, changeInlineStyle, position }) {
  return (
    <div
      style={{
        display: isOpen ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #999',
        borderRadius: 6,
        zIndex: 1000,
        top: position.top - 20,
        left: position.left,
        transform: 'translate(-50%, 0)'
      }}
    >
      <ToolBarBold onClick={() => changeInlineStyle('BOLD')} />
    </div>
  );
}
