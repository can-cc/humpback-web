import React from 'react';
import { SpaceSide } from './SpaceSide/SpaceSide';
import { PageDetail } from './PageDetail/PageDetail';
import { Flex } from '../../Component/Flex';

export function SpacePage() {
  return (
    <Flex>
      <SpaceSide />
      <PageDetail />
    </Flex>
  );
}
