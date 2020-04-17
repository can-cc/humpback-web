import React from 'react';
import { Flex } from '../../../../Component/Flex';
import { Bold } from '../../../../Component/Bold';
import { SpaceDisplay } from '../../../../interface/space';

export function SpaceInfo(props: { space: SpaceDisplay }) {
  return (
    <Flex
      alignCenter
      style={{
        padding: '12px 18px'
      }}
    >
      <img
        width="60"
        style={{
          boxShadow: '0 0 9px #eee',
          borderRadius: 8
        }}
        src="/humpback_logo.png"
        alt="logo"
      />
      <Bold
        style={{
          marginLeft: 12
        }}
      >
        {props.space.name}
      </Bold>
    </Flex>
  );
}
