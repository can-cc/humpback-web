import React, { createRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onUpload: (result: string | ArrayBuffer | null) => void
}

export function ImageUploader({ children, onUpload }) {
  const inputRef = createRef<HTMLInputElement>();

  const onClick = () => {
    inputRef.current.click();
  };

  const onChanged = () => {
    if (!inputRef.current.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target.result)
      inputRef.current.value = '';
    };
    reader.readAsArrayBuffer(inputRef.current.files[0]);
  };

  return (
    <div onClick={onClick}>
      <input
        style={{
          width: 0,
          height: 0
        }}
        accept="image/*"
        multiple={false}
        type="file"
        ref={inputRef}
        onChange={onChanged}
      />
      {children}
    </div>
  );
}
