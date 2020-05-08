import React from 'react';
import { RichEditorBlock } from '../../../../Component/Editor/RichEditorBlock';
import { useDispatch, useSelector } from 'react-redux';
import { IPageBlock, IPageDetail } from '../../../../domain/page';
import { selectPage } from '../../../../redux/selector/page-selector';
import { AppRootState } from '../../../../redux/reducer';
import { CreatePageBlockRequest, UpdatePageBlockRequest } from '../../../../redux/action/page-block-action';

export function PageEditor(props: { spaceId: string; pageId: string }) {
  const dispatch = useDispatch();
  const pageDetail = useSelector((state: AppRootState) => selectPage(state, props.pageId)) as IPageDetail | undefined;

  const createBlock = (content: string, previousBlockId?: string) => {
    dispatch(
      CreatePageBlockRequest({
        spaceId: props.spaceId,
        pageId: props.pageId,
        content,
        previousBlockId,
      })
    );
  };

  const updateBlock = (blockId: string, content: string) => {
    dispatch(
      UpdatePageBlockRequest({
        spaceId: props.spaceId,
        pageId: props.pageId,
        blockId,
        content: content,
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
              onChangeDebounce={(content) => {
                updateBlock(block.id, content);
              }}
              handleReturn={() => {
                createBlock('', block.id);
              }}
            />
          );
        })}
    </div>
  );
}
