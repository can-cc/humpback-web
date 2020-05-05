import React from 'react';
import { List, ListItem, ListSection } from '../List/List';
import { DropDownOverlay } from '../DropDown/DropDownOverlay';
import { ISpace } from '../../domain/space';
import { Divider } from '../Divider';

export function SpaceDropDownOverlay(props: { spaces: ISpace[]; openCreateSpaceModal: () => void }) {
  return (
    <DropDownOverlay style={{ color: 'black' }}>
      <List>
        <ListSection>
          {props.spaces.map(space => (
            <ListItem key={space.id}>{space.name}</ListItem>
          ))}
        </ListSection>

        <Divider />
        <ListSection>
          <ListItem>空间目录</ListItem>
          <ListItem onClick={props.openCreateSpaceModal}>创建空间</ListItem>
        </ListSection>
      </List>
    </DropDownOverlay>
  );
}
