import React, { useEffect, useRef, useState } from 'react';
import { ContentState, DraftHandleValue, Editor, EditorState } from 'draft-js';
import { IconButton } from '../Button/IconButton';
import { faEllipsisV, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Flex } from '../Flex';

import './RichEditorBlock.css';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function RichEditorBlock(props: {
  handleReturn: (content: string) => void;
  isNew: boolean;
  initContent: string;
  onBlur?: () => void;
  onChange?: (content: string) => void;
  changeDebounceTime?: number;
  onChangeDebounce?: (content: string) => void;
}) {
  const changeRef$ = useRef(new Subject<EditorState>());
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(props.initContent))
  );
  const onChange = (changedEditorState) => {
    setEditorState(changedEditorState);
    if (editorState.getCurrentContent().getPlainText() === changedEditorState.getCurrentContent().getPlainText()) {
      return;
    }
    changeRef$.current.next(changedEditorState);
    props.onChange && props.onChange(changedEditorState.getCurrentContent().getPlainText());
  };

  const onBlur = (editorState) => {
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const editorRef = useRef(null);

  const handleReturn = (e: React.KeyboardEvent<{}>, editorState: EditorState): DraftHandleValue => {
    editorRef.current.blur();
    e.preventDefault();
    props.handleReturn(editorState.getCurrentContent().getPlainText());
    return 'handled';
  };

  useEffect(() => {
    if (props.isNew) {
      editorRef.current.focus();
    }
  }, [props.isNew]);

  useEffect(() => {
    if (!props.onChangeDebounce) {
      return;
    }
    const subscriber = changeRef$.current
      .pipe(debounceTime(props.changeDebounceTime || 1300))
      .subscribe((state: EditorState) => {
        props.onChangeDebounce(state.getCurrentContent().getPlainText());
      });
    return () => {
      subscriber.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Flex alignCenter className="RichEditorBlock-root">
      <div className="RichEditorBlock-operation">
        <IconButton icon={faPlus} />
        <IconButton icon={faEllipsisV} />
      </div>
      <Editor
        ref={editorRef}
        placeholder="Typing here."
        editorState={editorState}
        onChange={onChange}
        onBlur={onBlur}
        handleReturn={handleReturn}
      />
    </Flex>
  );
}
