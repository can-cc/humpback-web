import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

export function EditorArrayContainer(props: { children: ReactNode }) {
  const [, drop] = useDrop({ accept: 'PageEditorBlock' });

  return <div ref={drop}>{props.children}</div>;
}
