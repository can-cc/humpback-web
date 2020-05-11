import React, { useEffect, useState } from 'react';
import { ColorPrimary } from '../../Constant/Color';
import { Humpback } from '../Humpback';
import { List } from '../List/List';
import { SpaceDropDownOverlay } from './SpaceDropDownOverlay';
import { CreateSpaceModal } from '../Modal/CreateSpaceModal/CreateSpaceModal';

import './AppHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { QuerySpaceListRequest } from '../../redux/action/space-action';
import { selectSpaceList } from '../../redux/selector/space-selector';
import { AppRootState } from '../../redux/reducer';
import { AppHeaderLink } from './AppHeaderLink';

export const AppHeaderHeight = 42;

export function AppHeader() {
  const dispatch = useDispatch();
  const [createSpaceModalVisible, setCreateSpaceModalVisible] = useState(false);

  useEffect(() => {
    const querySpaces = () => {
      dispatch(QuerySpaceListRequest({}));
    };
    querySpaces();
  }, [dispatch]);

  const spaceList = useSelector((state: AppRootState) => selectSpaceList(state));

  return (
    <>
      <header
        style={{
          zIndex: 100,
          backgroundColor: ColorPrimary,
          color: 'white',
          height: AppHeaderHeight,
          display: 'flex',
          flexShrink: 0,
          paddingLeft: 12,
        }}
      >
        <Humpback
          style={{
            marginRight: 12,
          }}
        />
        <List
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AppHeaderLink
            text="空间"
            dropDownOverlay={
              <SpaceDropDownOverlay spaces={spaceList} openCreateSpaceModal={() => setCreateSpaceModalVisible(true)} />
            }
          />
        </List>
      </header>

      <CreateSpaceModal isOpen={createSpaceModalVisible} onClose={() => setCreateSpaceModalVisible(false)} />
    </>
  );
}
