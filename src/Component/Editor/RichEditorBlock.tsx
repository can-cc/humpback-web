import React, { useEffect, useRef, useState } from 'react';
import { ContentState, DraftHandleValue, Editor, EditorState } from 'draft-js';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function RichEditorBlock(props: {
  onReturn: (content: string) => void;
  focusInitial: boolean;
  initContent: string;
  onBlur?: (editorState: EditorState) => void;
  placeholder?: string;
  onChange?: (content: string) => void;
  changeDebounceTime?: number;
  onChangeDebounce?: (content: string) => void;
}) {
  const {
    onReturn,
    focusInitial,
    initContent,
    onBlur,
    placeholder,
    onChange,
    changeDebounceTime,
    onChangeDebounce,
  } = props;

  const changeRef$ = useRef(new Subject<EditorState>());
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(initContent))
  );
  const handleOnChange = (changedEditorState) => {
    setEditorState(changedEditorState);
    if (editorState.getCurrentContent().getPlainText() === changedEditorState.getCurrentContent().getPlainText()) {
      return;
    }
    changeRef$.current.next(changedEditorState);
    onChange && onChange(changedEditorState.getCurrentContent().getPlainText());
  };

  const handleOnBlur = (editorState) => {
    if (onBlur) {
      onBlur(editorState);
    }
  };

  const editorRef = useRef(null);

  const handleReturn = (e: React.KeyboardEvent<{}>, editorState: EditorState): DraftHandleValue => {
    editorRef.current.blur();
    e.preventDefault();
    onReturn(editorState.getCurrentContent().getPlainText());
    return 'handled';
  };

  useEffect(() => {
    if (focusInitial) {
      editorRef.current.focus();
    }
  }, [focusInitial]);

  useEffect(() => {
    if (!onChangeDebounce) {
      return;
    }
    const subscriber = changeRef$.current
      .pipe(debounceTime(changeDebounceTime || 600))
      .subscribe((state: EditorState) => {
        onChangeDebounce(state.getCurrentContent().getPlainText());
      });
    return () => {
      subscriber.unsubscribe();
    };
  }, [changeDebounceTime, onChangeDebounce]);

  return (
    <Editor
      ref={editorRef}
      placeholder={placeholder}
      editorState={editorState}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      handleReturn={handleReturn}
    />
  );
}
