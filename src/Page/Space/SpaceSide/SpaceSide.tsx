import React from 'react';
import { List, ListItem, ListSection } from '../../../Component/List/List';
import { SpaceInfo } from './SpaceInfo/SpaceInfo';
import { useHistory, useParams } from 'react-router-dom';
import { SpaceSideFooter } from './SpaceSideFooter';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../../redux/reducer';
import { selectSpaceById } from '../../../redux/selector/space-selector';
import { selectPageList } from '../../../redux/selector/page-selector';
import { IPage } from '../../../domain/page';
import { AppText } from '../../../Component/Typography/AppText';
import { RootPageCreator } from './RootPageCreator';
import { Divider } from '../../../Component/Divider';

export const SpaceSideBgColor = '#f4f5f7';

export function SpaceSide(props: { selectPageId?: string }) {
  const history = useHistory();
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;
  const space = useSelector((state: AppRootState) => selectSpaceById(state, spaceId));
  const pages = useSelector((state: AppRootState) => selectPageList(state, spaceId)) || [];

  const onPageClick = (page: IPage) => {
    history.push(`/space/${spaceId}?pageId=${page.id}`);
  };

  return (
    <aside
      style={{
        width: 285,
        height: '100%',
        flexShrink: 0,
        flexGrow: 0,
        backgroundColor: SpaceSideBgColor,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <SpaceInfo space={space} />

      <RootPageCreator spaceId={spaceId} />

      <Divider style={{ margin: '3px 12px 0', width: 'auto' }} />

      <List
        scrollY
        style={{
          paddingLeft: 30,
          listStyle: 'dot',
          flexGrow: 1000
        }}
      >
        <ListSection style={{ paddingLeft: 3 }}>
          {pages.map(page => (
            <ListItem active={props.selectPageId === page.id} key={page.id} onClick={() => onPageClick(page)}>
              <AppText ellipsis hoverTitle={page.title}>
                {page.title || '未命名页面'}
              </AppText>
            </ListItem>
          ))}
        </ListSection>
      </List>

      <SpaceSideFooter space={space} />
    </aside>
  );
}
