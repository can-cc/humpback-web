import React, { useState, useEffect } from 'react';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';
import { v4 as uuidv4 } from 'uuid';

class EditorUnit {
  private id: string;
  private content = '';
  constructor() {
    this.id = uuidv4();
  }
  public getId() {
    return this.id;
  }
  public getContent() {
    return this.content;
  }
}

export function PageEditor() {
  const [editorUnits, setEditorUnits] = useState<EditorUnit[]>([]);

  useEffect(() => {
    setEditorUnits([new EditorUnit()]);
  }, []);

  const appendEditorUnit = (lastUnitId: string) => {
    const newUnits: EditorUnit[] = [...editorUnits];
    const lastIndex = newUnits.findIndex((u) => u.getId() === lastUnitId);
    if (lastIndex < 0) {
      return;
    }
    newUnits.splice(lastIndex, 0, new EditorUnit());
    setEditorUnits(newUnits);
  };

  return (
    <div
      className="PageEditor"
      style={{
        width: '100%',
      }}
    >
      {editorUnits.map((editorUnit: EditorUnit) => {
        return (
          <RichEditorBlock
            handleReturn={() => {
              appendEditorUnit(editorUnit.getId());
            }}
          />
        );
      })}
    </div>
  );
}
