import React, { ReactNode, useState, useEffect } from 'react';
import { ColorPrimary } from '../../Constant/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Humpback } from '../Humpback';
import { List, ListItem } from '../List/List';
import { AppDropDown } from '../DropDown/DropDown';
import { SpaceDisplay } from '../../interface/space';
import { Text } from '../Text';
import { SpaceDropDownOverlay } from './SpaceDropDownOverlay';
import { CreateSpaceModal } from '../../Page/Space/CreateSpaceModal/CreateSpaceModal';

import './AppHeader.css';

export const AppHeaderHeight = 42;

const mockSpaces: SpaceDisplay[] = [
  { id: '1', name: '猕猴桃空间' },
  { id: '2', name: '秦朝城市规划研究' }
];

function AppHeaderLink(props: { text: string; dropDownOverlay?: ReactNode }) {
  return (
    <ListItem>
      <AppDropDown
        toggle={(toggle: boolean) => (
          <div
            className="AppHeaderLink--toggle-content"
            style={{
              display: 'flex',
              padding: '2px 8px',
              borderRadius: 4,
              alignItems: 'center',
              ...(toggle
                ? {
                    backgroundColor: '#687cf1'
                  }
                : {})
            }}
          >
            <Text>{props.text}</Text>
            <FontAwesomeIcon
              size="sm"
              icon={faChevronDown}
              style={{
                marginTop: 2,
                marginLeft: 3
              }}
            />
          </div>
        )}
        overlay={props.dropDownOverlay}
      />
    </ListItem>
  );
}

export function AppHeader() {
  const [createSpaceModalVisible, setCreateSpaceModalVisible] = useState(false);

  useEffect(() => {
    setCreateSpaceModalVisible(true);
  }, []);

  return (
    <>
      <header
        style={{
          backgroundColor: ColorPrimary,
          color: 'white',
          height: AppHeaderHeight,
          display: 'flex',
          paddingLeft: 12
        }}
      >
        <Humpback
          style={{
            marginRight: 12
          }}
        />
        <List
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <AppHeaderLink
            text="空间"
            dropDownOverlay={
              <SpaceDropDownOverlay
                spaces={mockSpaces}
                openCreateSpaceModal={() => setCreateSpaceModalVisible(true)}
              />
            }
          />
        </List>
      </header>

      <CreateSpaceModal
        isOpen={createSpaceModalVisible}
        onClose={() => setCreateSpaceModalVisible(false)}
      />
    </>
  );
}
