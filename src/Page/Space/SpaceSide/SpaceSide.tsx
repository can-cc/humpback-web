import React from 'react';
import { List, ListItem, ListSection } from '../../../Component/List/List';
import { SpaceInfo } from './SpaceInfo/SpaceInfo';
import { useParams } from 'react-router-dom';
import { SpaceSideFooter } from './SpaceSideFooter';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../../redux/reducer';
import { selectSpaceById } from '../../../redux/selector/space-selector';
import { selectPageList } from '../../../redux/selector/page-selector';
import { appHistory } from '../../../common/history';
import { IPage } from '../../../domain/page';

export function SpaceSide(props: { selectPageId?: string }) {
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;
  const space = useSelector((state: AppRootState) => selectSpaceById(state, spaceId));
  const pages = useSelector((state: AppRootState) => selectPageList(state, spaceId)) || [];

  const onPageClick = (page: IPage) => {
    appHistory.push(`/space/${spaceId}?pageId=${page.id}`);
  };
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
          {pages.map((page) => (
            <ListItem active={props.selectPageId === page.id} key={page.id} onClick={() => onPageClick(page)}>
              {page.title || '未命名页面'}
            </ListItem>
          ))}
        </ListSection>
      </List>

      <SpaceSideFooter space={space} />
    </aside>
  );
}
