import React from 'react';
import { ISpace } from '../../../../domain/space';

export function PageHeader(props: { space: ISpace }) {
  return <div>{props.space.name}</div>;
}
