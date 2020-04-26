import React, { useState } from 'react';
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import { IconButton } from '../Button/IconButton';
import { faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Flex } from '../Flex';

import './RichEditorBlock.css';

export function RichEditorBlock(props: { handleReturn: Function }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (editorState) => setEditorState(editorState);

  const handleReturn = (
    e: React.KeyboardEvent<{}>,
    editorState: EditorState
  ): DraftHandleValue => {
    e.preventDefault();
    props.handleReturn();
    return 'handled';
  };

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
        handleReturn={handleReturn}
      />
    </Flex>
  );
}
