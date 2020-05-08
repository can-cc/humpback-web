import React, { useEffect } from 'react';
import { PageEditor } from './PageEditor/PageEditor';
import { PageHeader } from './PageHeader/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../../redux/reducer';
import { selectPage } from '../../../redux/selector/page-selector';
import { useParams } from 'react-router-dom';
import { QueryPageDetailRequest } from '../../../redux/action/page-action';

export function PageDetail(props: { selectPageId: string }) {
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;
  const page = useSelector((state: AppRootState) => selectPage(state, props.selectPageId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      QueryPageDetailRequest({
        spaceId,
        pageId: props.selectPageId,
      })
    );
  }, [props.selectPageId]);

  if (!page) {
    return <div>nothing...</div>;
  }
  return (
    <div style={{ width: '100%', padding: 20, overflow: 'auto' }}>
      <PageHeader page={page} />
      <PageEditor spaceId={spaceId} pageId={props.selectPageId} />
    </div>
  );
}
