import React, { useState } from 'react';
import { BlockType, IPageBlock } from '../../../../typing/page';
import { RichEditor } from '../../../../Component/Editor/RichEditor';
import { ImageBlock } from "./ImageBlock";

interface Props {
  block: IPageBlock;
  isOnly: boolean;
  createBlock: Function;
  onChangeDebounce: (content: string) => void;
}

export function Block({ block, isOnly, createBlock, onChangeDebounce }: Props) {
  const [editorFocus, setEditorFocus] = useState(false);
  if (block.type === BlockType.Image.toString()) {
    return <ImageBlock block={block} />;
  }
  return (
    <RichEditor
      focusInitial={block.focusInitial}
      initContent={block.content}
      onChangeDebounce={onChangeDebounce}
      placeholder={isOnly || editorFocus ? '请输入内容' : ''}
      onFocus={() => setEditorFocus(true)}
      onBlur={() => setEditorFocus(false)}
      onReturn={() => {
        createBlock('', block.id);
      }}
    />
  );
}
