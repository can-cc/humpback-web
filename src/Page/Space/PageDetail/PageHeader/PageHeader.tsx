import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IPage } from '../../../../typing/page';
import { useDispatch } from 'react-redux';
import { UpdatePageRequest } from '../../../../redux/action/page-action';
import { useParams } from 'react-router-dom';
import { TextArea } from '../../../../Component/Form/TextArea';

export function PageHeader(props: { page: IPage; isNew: boolean }) {
  const { page, isNew } = props;
  const textRef = useRef<HTMLTextAreaElement>();
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(page.title);

  useEffect(() => {
    setTitle(page.title);
  }, [page]);

  const updatePageTitle = useCallback(
    (t) => {
      if (t === page.title) {
        return;
      }
      dispatch(
        UpdatePageRequest({
          spaceId,
          pageId: page.id,
          title: t,
        })
      );
    },
    [dispatch, page.title, page.id, spaceId]
  );

  useEffect(() => {
    if (isNew) {
      textRef.current.focus();
    }
  }, [isNew]);

  return (
    <div>
      <TextArea
        ref={textRef}
        borderLess
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onChangeDebounce={updatePageTitle}
        onBlur={() => updatePageTitle(title)}
        onKeyDown={(keyDown) => {
          if (keyDown.key === 'Enter') {
            updatePageTitle(title);
            textRef.current.blur();
            keyDown.nativeEvent.preventDefault();
          }
        }}
        placeholder="未命名"
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
          fontSize: 28,
          maxHeight: 300,
          lineHeight: 1.8,
        }}
      />
    </div>
  );
}
