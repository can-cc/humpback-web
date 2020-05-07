import React, { useEffect } from 'react';
import { SpaceSide } from './SpaceSide/SpaceSide';
import { PageDetail } from './PageDetail/PageDetail';
import { Flex } from '../../Component/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { QueryPageListRequest } from '../../redux/action/page-action';
import { AppRootState } from '../../redux/reducer';
import { selectSpaceById } from '../../redux/selector/space-selector';
import { appHistory } from '../../common/history';

export function SpacePage() {
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;

  const searchParams = new URLSearchParams(appHistory.location.search);
  const selectPageId = searchParams.get('pageId');
  const dispatch = useDispatch();
  const queryPageList = () =>
    dispatch(
      QueryPageListRequest({
        spaceId,
      })
    );
  const space = useSelector((state: AppRootState) => selectSpaceById(state, spaceId));

  useEffect(() => {
    if (space) {
      queryPageList();
    }
  }, [space && space.id]);

  if (!space) {
    return <div>loading...</div>;
  }

  return (
    <Flex
      style={{
        height: '100%',
      }}
    >
      <SpaceSide selectPageId={selectPageId} />
      <PageDetail selectPageId={selectPageId} />
    </Flex>
  );
}
