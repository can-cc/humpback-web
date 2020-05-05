import React, { ReactNode } from 'react';
import { ListItem } from '../List/List';
import { AppDropDown } from '../DropDown/DropDown';
import { Text } from '../Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function AppHeaderLink(props: { text: string; dropDownOverlay?: ReactNode }) {
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
