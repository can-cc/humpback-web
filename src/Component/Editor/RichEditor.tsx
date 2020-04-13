import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

export function RichEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (editorState) => setEditorState(editorState);
  return <Editor editorState={editorState} onChange={onChange} />;
}
