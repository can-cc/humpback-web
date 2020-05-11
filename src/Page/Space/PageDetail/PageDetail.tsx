import React, { useEffect } from 'react';
import { PageEditor } from './PageEditor/PageEditor';
import { PageHeader } from './PageHeader/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../../redux/reducer';
import { selectPage } from '../../../redux/selector/page-selector';
import { useHistory, useParams } from 'react-router-dom';
import { QueryPageDetailRequest } from '../../../redux/action/page-action';
import _get from 'lodash/get';

export function PageDetail(props: { selectPageId: string }) {
  const history = useHistory<{ isNew?: boolean }>();
  const isNewPage = !!_get(history, ['location', 'state', 'isNew']);
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;
  const page = useSelector((state: AppRootState) => selectPage(state, props.selectPageId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.selectPageId) {
      return;
    }
    dispatch(
      QueryPageDetailRequest({
        spaceId,
        pageId: props.selectPageId,
      })
    );
  }, [dispatch, props.selectPageId, spaceId]);

  if (!page) {
    return <div>nothing...</div>;
  }
  return (
    <div style={{ width: '100%', padding: 20, overflow: 'auto' }}>
      <PageHeader page={page} isNew={isNewPage} />
      <PageEditor spaceId={spaceId} pageId={props.selectPageId} isNew={isNewPage} />
    </div>
  );
}
