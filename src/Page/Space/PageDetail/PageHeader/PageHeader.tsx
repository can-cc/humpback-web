import React, { useEffect, useState } from 'react';
import { IPage } from '../../../../domain/page';
import { Input } from '../../../../Component/Form/Input';
import { useDispatch } from 'react-redux';
import { UpdatePageRequest } from '../../../../redux/action/page-action';
import { useParams } from 'react-router-dom';

export function PageHeader(props: { page: IPage }) {
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.page.title);

  let updatedTitle: string;
  useEffect(() => {
    updatedTitle = title;
  }, []);
  function updatePageTitle() {
    if (updatedTitle === title) {
      return;
    }
    updatedTitle = title;
    dispatch(
      UpdatePageRequest({
        spaceId,
        pageId: props.page.id,
        title: title,
      })
    );
  }

  return (
    <div>
      <Input
        type="ghost"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={updatePageTitle}
        onKeyDown={(keyDown) => {
          if (keyDown.key === 'Enter') {
            updatePageTitle();
          }
        }}
        placeholder="未命名"
        style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', fontSize: 26 }}
      />
    </div>
  );
}
