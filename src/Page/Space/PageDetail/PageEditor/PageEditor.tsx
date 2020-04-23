import React from 'react';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';

export function PageEditor() {
  return (
    <div
      className="PageEditor"
      style={{
        width: '100%',
      }}
    >
      <RichEditorBlock />
    </div>
  );
}
