import React from 'react';
import { Button } from '../../../Component/Button/Button';
import { useDispatch } from 'react-redux';
import { CreatPageRequest } from '../../../redux/action/page-action';
import { ISpace } from '../../../domain/space';

export function SpaceSideFooter(props: { space: ISpace }) {
  const dispatch = useDispatch();
  const createPage = () => {
    dispatch(
      CreatPageRequest({
        spaceId: props.space.id,
        title: '',
      })
    );
  };
  return (
    <div>
      <div>
        <Button onClick={createPage}>新建页面</Button>
      </div>
    </div>
  );
}
