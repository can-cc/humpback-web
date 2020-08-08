import React, { useEffect, useRef, useState } from 'react';
import Draft, {
  ContentState,
  convertFromRaw,
  convertToRaw,
  DraftHandleValue,
  Editor,
  EditorState,
  getVisibleSelectionRect,
  RawDraftContentState,
  RichUtils
} from 'draft-js';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RichEditorToolBar } from './Toolbar/RichEditorToolBar';

export function RichEditor(props: {
  onReturn: () => void;
  focusInitial: boolean;
  initContent: string;
  onBlur?: () => void;
  onFocus?: () => void;
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
    onFocus,
    placeholder,
    changeDebounceTime,
    onChangeDebounce
  } = props;

  const changeRef$ = useRef(new Subject<EditorState>());
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>();
  const [editorState, setEditorState] = useState(
    initContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(initContent)))
      : EditorState.createWithContent(ContentState.createFromText(''))
  );
  const [isSelected, setIsSelected] = useState(false);

  const handleOnChange = changedEditorState => {
    setEditorState(changedEditorState);
    const selectSection = changedEditorState.getSelection();
    const isSelected = selectSection.getStartOffset() !== selectSection.getEndOffset();
    setIsSelected(isSelected);

    if (isSelected) {
      const selectionRect = getVisibleSelectionRect(window);
      if (selectionRect) {
        const containerRect = containerRef.current.getBoundingClientRect();

        setToolbarPosition({
          top: selectionRect.top - containerRect.top,
          left: selectionRect.left - containerRect.left + selectionRect.width / 2
        });
      }
    }

    if (editorState.getCurrentContent() === changedEditorState.getCurrentContent()) {
      return;
    }
    changeRef$.current.next(changedEditorState);
  };

  const handleOnBlur = () => {
    onBlur && onBlur();
    setIsSelected(false);
  };

  const handleOnFocus = () => {
    onFocus && onFocus();
  };

  const editorRef = useRef(null);
  const handleReturn = (e: React.KeyboardEvent<{}>, editorState: EditorState): DraftHandleValue => {
    editorRef.current.blur();
    e.preventDefault();
    onReturn();
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
        onChangeDebounce(JSON.stringify(convertToRaw(state.getCurrentContent())));
      });
    return () => {
      subscriber.unsubscribe();
    };
  }, [changeDebounceTime, onChangeDebounce]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative'
      }}
    >
      <RichEditorToolBar
        position={toolbarPosition}
        isOpen={isSelected}
        changeInlineStyle={style => {
          const styledState = RichUtils.toggleInlineStyle(editorState, style);
          setEditorState(styledState);
          changeRef$.current.next(editorState);
        }}
      />
      <Editor
        ref={editorRef}
        placeholder={placeholder}
        editorState={editorState}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        handleReturn={handleReturn}
      />
    </div>
  );
}
