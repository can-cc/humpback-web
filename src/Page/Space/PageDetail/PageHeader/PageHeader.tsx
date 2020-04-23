import React from 'react';
import { SpaceDisplay } from '../../../../interface/space';

export function PageHeader(props: { space: SpaceDisplay }) {
  return <div>{props.space.name}</div>;
}
