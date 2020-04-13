import React, { ReactNode } from 'react';
import { ColorPrimary } from '../../Constant/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Humpback } from '../Humpback';
import { List } from '../List/List';
import { DropDownOverlay } from '../DropDown/DropDownOverlay';
import { AppDropDown } from '../DropDown/DropDown';
import { ListItem } from '../List/ListItem';
import { Divider } from '../Divider';
import { SpaceDisplay } from '../../interface/space';
import { ListSection } from '../List/ListSection';

export const AppHeaderHeight = 42;

const mockSpaceLists: SpaceDisplay[] = [
  { id: '1', name: '猕猴桃空间' },
  { id: '2', name: '秦朝城市规划研究' },
];

function AppHeaderLink(props: { text: string; dropDownOverlay?: ReactNode }) {
  return (
    <ListItem>
      <AppDropDown
        toggle={() => (
          <>
            {props.text}
            <FontAwesomeIcon icon={faChevronDown} />
          </>
        )}
        overlay={props.dropDownOverlay}
      />
    </ListItem>
  );
}

export function AppHeader() {
  return (
    <header
      style={{
        backgroundColor: ColorPrimary,
        color: 'white',
        height: AppHeaderHeight,
        display: 'flex',
        paddingLeft: 12,
      }}
    >
      <Humpback />
      <List>
        <AppHeaderLink
          text="空间"
          dropDownOverlay={
            <DropDownOverlay style={{ color: 'black' }}>
              <List>
                <ListSection>
                  {mockSpaceLists.map((space) => (
                    <ListItem key={space.id}>{space.name}</ListItem>
                  ))}
                </ListSection>

                <Divider />
                <ListSection>
                  <ListItem>空间目录</ListItem>
                  <ListItem>创建空间</ListItem>
                </ListSection>
              </List>
            </DropDownOverlay>
          }
        />
      </List>
    </header>
  );
}
