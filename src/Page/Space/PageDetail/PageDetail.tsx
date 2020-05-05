import React from 'react';
import { PageEditor } from './PageEditor/PageEditor';
import { PageHeader } from './PageHeader/PageHeader';
import { ISpace } from '../../../domain/space';

const space: ISpace = {
  id: '123',
  name: 'HIHI'
};

export function PageDetail() {
  return (
    <div style={{ width: '100%' }}>
      <PageHeader space={space} />
      <PageEditor />
    </div>
  );
}
