import React, { useEffect, useRef, useState } from 'react';
import { ContentState, DraftHandleValue, Editor, EditorState } from 'draft-js';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function RichEditorBlock(props: {
  handleReturn: (content: string) => void;
  focusInitial: boolean;
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
    if (props.focusInitial) {
      editorRef.current.focus();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!props.onChangeDebounce) {
      return;
    }
    const subscriber = changeRef$.current
      .pipe(debounceTime(props.changeDebounceTime || 600))
      .subscribe((state: EditorState) => {
        props.onChangeDebounce(state.getCurrentContent().getPlainText());
      });
    return () => {
      subscriber.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Editor
      ref={editorRef}
      placeholder="请输入内容"
      editorState={editorState}
      onChange={onChange}
      onBlur={onBlur}
      handleReturn={handleReturn}
    />
  );
}
