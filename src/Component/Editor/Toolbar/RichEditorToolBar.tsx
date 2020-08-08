import React from 'react';
import { BoldButton } from './BoldButton';
import { ItalicButton } from './ItalicButton';

export function RichEditorToolBar({ isOpen, changeInlineStyle, position }) {
  return (
    <div
      style={{
        display: isOpen ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #eee',
        padding: '3px 6px',
        borderRadius: 6,
        zIndex: 1000,
        top: position.top - 32,
        left: position.left,
        transform: 'translate(-50%, 0)'
      }}
    >
      <BoldButton onClick={() => changeInlineStyle('BOLD')} />
      <ItalicButton onClick={() => changeInlineStyle('ITALIC')} />
    </div>
  );
}
