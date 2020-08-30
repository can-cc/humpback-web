import React from 'react';
import { List, ListItem, ListSection } from '../List/List';
import { DropDownOverlay } from '../DropDown/DropDownOverlay';
import { ISpace } from '../../typing/space';
import { Divider } from '../Divider';
import { useHistory } from 'react-router-dom';

export function SpaceDropDownOverlay(props: { spaces: ISpace[]; openCreateSpaceModal: () => void }) {
  const history = useHistory();

  return (
    <DropDownOverlay style={{ color: 'black' }}>
      <List>
        <ListSection>
          {props.spaces.map((space) => (
            <ListItem key={space.id} onClick={() => history.push(`/space/${space.id}`)}>
              {space.name}
            </ListItem>
          ))}
        </ListSection>

        <Divider />
        <ListSection>
          <ListItem onClick={() => history.push('/spaces')}>空间目录</ListItem>
          <ListItem onClick={props.openCreateSpaceModal}>创建空间</ListItem>
        </ListSection>
      </List>
    </DropDownOverlay>
  );
}
