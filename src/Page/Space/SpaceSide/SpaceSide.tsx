import React from 'react';
import { List } from '../../../Component/List/List';
import { ListSection } from '../../../Component/List/ListSection';
import { ListItem } from '../../../Component/List/ListItem';
import { Space } from '../../../interface/page';

const mockPages: Space[] = [
  { id: '1', name: '秦朝年历表' },
  { id: '2', name: '嬴政的一生' },
  { id: '3', name: '阿房宫真的存在吗？' },
  { id: '4', name: '秦二世的后宫有多少个？' },
  { id: '5', name: '兵马俑中的稀世珍品' },
];

export function SpaceSide() {
  return (
    <aside>
      <List>
        <ListSection>
          {mockPages.map((space) => (
            <ListItem key={space.id}>{space.name}</ListItem>
          ))}
        </ListSection>
      </List>
    </aside>
  );
}
