import React from 'react';
import { SpaceDisplay } from '../../../interface/space';
import { List } from '../../../Component/List/List';
import { ListSection } from '../../../Component/List/ListSection';
import { ListItem } from '../../../Component/List/ListItem';

const mockSpaceLists: SpaceDisplay[] = [
  { id: '1', name: '猕猴桃空间' },
  { id: '2', name: '秦朝城市规划研究' },
];

export function SpaceSide() {
  return (
    <aside>
      <List>
        <ListSection>
          {mockSpaceLists.map((space) => (
            <ListItem key={space.id}>{space.name}</ListItem>
          ))}
        </ListSection>
      </List>
    </aside>
  );
}
