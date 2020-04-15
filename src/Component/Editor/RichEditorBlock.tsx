import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

import './RichEditorBlock.css';
import { IconButton } from '../Button/IconButton';
import { faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Flex } from '../Flex';

export function RichEditorBlock() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (editorState) => setEditorState(editorState);
  return (
    <Flex alignCenter className="RichEditorBlock-root">
      <div className="RichEditorBlock-operation">
        <IconButton icon={faPlus} />
        <IconButton icon={faEllipsisV} />
      </div>
      <Editor
        placeholder="Typing here."
        editorState={editorState}
        onChange={onChange}
      />
    </Flex>
  );
}
