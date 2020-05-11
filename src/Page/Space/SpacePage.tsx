import React, { useCallback, useEffect } from 'react';
import { SpaceSide } from './SpaceSide/SpaceSide';
import { PageDetail } from './PageDetail/PageDetail';
import { Flex } from '../../Component/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { QueryPageListRequest } from '../../redux/action/page-action';
import { AppRootState } from '../../redux/reducer';
import { selectSpaceById } from '../../redux/selector/space-selector';

export function SpacePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectPageId = searchParams.get('pageId');

  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;

  const dispatch = useDispatch();
  const queryPageList = useCallback(
    () =>
      dispatch(
        QueryPageListRequest({
          spaceId,
        })
      ),
    [dispatch, spaceId]
  );
  const space = useSelector((state: AppRootState) => selectSpaceById(state, spaceId));

  useEffect(() => {
    queryPageList();
  }, [queryPageList]);

  if (!space) {
    return <div>loading...</div>;
  }

  return (
    <Flex
      style={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <SpaceSide selectPageId={selectPageId} />
      <PageDetail selectPageId={selectPageId} />
    </Flex>
  );
}
