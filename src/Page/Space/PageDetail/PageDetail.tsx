import React from 'react';
import { PageEditor } from './PageEditor/PageEditor';
import { PageHeader } from './PageHeader/PageHeader';
import { SpaceDisplay } from '../../../interface/space';

const space: SpaceDisplay = {
  id: '123',
  name: 'HIHI'
}

export function PageDetail() {
  return (
    <div style={{width: '100%'}}>
      <PageHeader space={space} />
      <PageEditor />
    </div>
  );
}
