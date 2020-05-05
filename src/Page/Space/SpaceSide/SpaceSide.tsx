import React from 'react';
import { List, ListItem, ListSection } from '../../../Component/List/List';
import { SpaceInfo } from './SpaceInfo/SpaceInfo';
import { useParams } from 'react-router-dom';
import { SpaceSideFooter } from './SpaceSideFooter';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../../redux/reducer';
import { selectSpaceById } from '../../../redux/selector/space-selector';
import { selectPageList } from '../../../redux/selector/page-selector';

export function SpaceSide() {
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;
  const space = useSelector((state: AppRootState) => selectSpaceById(state, spaceId));
  const pages = useSelector((state: AppRootState) => selectPageList(state, spaceId)) || [];
  return (
    <aside
      style={{
        width: 285,
        height: '100%',
        backgroundColor: '#f4f5f7',
      }}
    >
      <SpaceInfo space={space} />
      <List>
        <ListSection>
          {pages.map((space) => (
            <ListItem key={space.id}>{space.name || '未命名页面'}</ListItem>
          ))}
        </ListSection>
      </List>

      <SpaceSideFooter space={space} />
    </aside>
  );
}
