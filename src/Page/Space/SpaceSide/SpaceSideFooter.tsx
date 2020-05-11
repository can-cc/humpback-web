import React from 'react';
import { Button } from '../../../Component/Button/Button';
import { ISpace } from '../../../domain/space';
import { Flex } from '../../../Component/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { AppText } from '../../../Component/Typography/AppText';
import { SpaceSideBgColor } from './SpaceSide';
import { TextPrimaryColor } from '../../../Constant/Color';

export function SpaceSideFooter(props: { space: ISpace }) {
  return (
    <div
      style={{
        flex: '0 0 auto',
        paddingBottom: 8,
        width: '100%',
        backgroundColor: SpaceSideBgColor,
      }}
    >
      <Flex alignCenter spaceBetween style={{ padding: '0 0px', fontSize: 14, paddingLeft: 8, paddingTop: 6 }}>
        <Button type="ghost" size="sm">
          <FontAwesomeIcon icon={faCog} style={{ marginRight: 6, fontSize: 13, color: TextPrimaryColor }} />
          <AppText inline size={14}>
            空间设置
          </AppText>
        </Button>
      </Flex>
    </div>
  );
}
