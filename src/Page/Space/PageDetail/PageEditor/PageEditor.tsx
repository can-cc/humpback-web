import React, { useState } from 'react';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';
import { EditorUnit } from './EditorUnit';
import { useDispatch, useSelector } from 'react-redux';
import { IPageBlock, IPageDetail } from '../../../../domain/page';
import { selectPage } from '../../../../redux/selector/page-selector';
import { AppRootState } from '../../../../redux/reducer';
import { CreatePageBlockRequest } from '../../../../redux/action/page-block-action';

export function PageEditor(props: { spaceId: string; pageId: string }) {
  const dispatch = useDispatch();
  const pageDetail = useSelector((state: AppRootState) => selectPage(state, props.pageId)) as IPageDetail | undefined;

  const [editorUnits, setEditorUnits] = useState<EditorUnit[]>([]);
  console.log('pageDetail', pageDetail);

  // let editUnitsInited = false;
  // useEffect(() => {
  //   if (!pageDetail) {
  //     return;
  //   }
  //   if (editUnitsInited) {
  //     return;
  //   }
  //   if (!pageDetail.blocks) {
  //     setEditorUnits([new EditorUnit(true)]);
  //     editUnitsInited = true;
  //     return;
  //   }
  //   const units = pageDetail.blocks.map((b) => {
  //     const unit = new EditorUnit(false);
  //     unit.setContent(b.content);
  //     unit.setId(b.id);
  //     return unit;
  //   });
  //   setEditorUnits(units);
  //   editUnitsInited = true;
  // }, [pageDetail.blocks]);

  const appendEditorUnit = (lastUnitId: string) => {
    const newUnits: EditorUnit[] = [...editorUnits];
    const lastIndex = newUnits.findIndex((u) => u.getId() === lastUnitId);
    if (lastIndex < 0) {
      return;
    }
    newUnits.splice(lastIndex + 1, 0, new EditorUnit(true));
    setEditorUnits(newUnits);
  };

  const createBlock = (content) => {
    dispatch(
      CreatePageBlockRequest({
        spaceId: props.spaceId,
        pageId: props.pageId,
        content,
      })
    );
  };

  return (
    <div
      className="PageEditor"
      style={{
        width: '100%',
      }}
    >
      {pageDetail.blocks &&
        pageDetail.blocks.map((block: IPageBlock) => {
          return (
            <RichEditorBlock
              key={block.id}
              isNew={!!block.id}
              initContent={block.content}
              onChange={(content) => {
                // editorUnit.setContent(content);
              }}
              onBlur={() => {
                // TODO use rxjs
                // if (editorUnit.getIsNew()) {
                //   createBlock(editorUnit.getContent());
                //   editorUnit.setIsNew(false);
                // }
              }}
              handleReturn={() => {
                // if (editorUnit.getIsNew()) {
                //   createBlock(editorUnit.getContent());
                //   editorUnit.setIsNew(false);
                // }
                // appendEditorUnit(block.id);
              }}
            />
          );
        })}

      {!pageDetail.blocks && (
        <RichEditorBlock
          key={'@new'}
          isNew={true}
          initContent={''}
          onChange={(content) => {
            // editorUnit.setContent(content);
          }}
          onBlur={() => {
            // TODO use rxjs
            // if (editorUnit.getIsNew()) {
            //   createBlock(editorUnit.getContent());
            //   editorUnit.setIsNew(false);
            // }
          }}
          handleReturn={(content) => {
            createBlock(content);
            // if (editorUnit.getIsNew()) {
            //   createBlock(editorUnit.getContent());
            //   editorUnit.setIsNew(false);
            // }
            // appendEditorUnit(block.id);
          }}
        />
      )}
    </div>
  );
}
