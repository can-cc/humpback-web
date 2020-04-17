import React from 'react';
import { List, ListItem, ListSection } from '../../../Component/List/List';
import { PageDisplay } from '../../../interface/page';
import { SpaceInfo } from './SpaceInfo/SpaceInfo';
import { SpaceDisplay } from '../../../interface/space';

const mockPages: PageDisplay[] = [
  { id: '1', name: '秦朝年历表' },
  { id: '2', name: '嬴政的一生' },
  { id: '3', name: '阿房宫真的存在吗？' },
  { id: '4', name: '秦二世的后宫有多少个？' },
  { id: '5', name: '兵马俑中的稀世珍品' }
];

const mockSpace: SpaceDisplay = {
  id: '12',
  name: '秦朝研究'
};

export function SpaceSide() {
  return (
    <aside
      style={{
        width: 285,
        height: '100%',
        backgroundColor: '#f4f5f7'
      }}
    >
      <SpaceInfo space={mockSpace} />
      <List>
        <ListSection>
          {mockPages.map(space => (
            <ListItem key={space.id}>{space.name}</ListItem>
          ))}
        </ListSection>
      </List>
    </aside>
  );
}
