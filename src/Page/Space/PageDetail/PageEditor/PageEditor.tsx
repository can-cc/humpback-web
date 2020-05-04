import React, { useState, useEffect } from 'react';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';
import { EditorUnit } from "./EditorUnit";



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
    newUnits.splice(lastIndex + 1, 0, new EditorUnit(true));
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
            key={editorUnit.getId()}
            isNew={editorUnit.getIsNew()}
            initContent={editorUnit.getContent()}
            onChange={(content) => {
              editorUnit.setContent(content);
            }}
            handleReturn={() => {
              appendEditorUnit(editorUnit.getId());
            }}
          />
        );
      })}
    </div>
  );
}
