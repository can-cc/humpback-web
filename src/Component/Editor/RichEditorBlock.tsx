import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

export function RichEditorBlock() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (editorState) => setEditorState(editorState);
  return <Editor placeholder="Typing here." editorState={editorState} onChange={onChange} />;
}
