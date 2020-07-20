import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../redux/reducer';
import { selectSpaceList } from '../../redux/selector/space-selector';
import { useHistory } from 'react-router-dom';
import { Heading } from "../../Component/Typography/Heading";
import { PageHeading } from "../../Component/Typography/PageHeading";

export function SpaceListPage() {
  const spaceList = useSelector((state: AppRootState) => selectSpaceList(state));
  const history = useHistory();

  return (
    <div>

     <PageHeading>空间目录</PageHeading>

      {spaceList.map((space) => {
        return (
          <div
            key={space.id}
            onClick={() => {
              history.push(`/space/${space.id}`);
            }}
          >
            {space.name}
          </div>
        );
      })}
    </div>
  );
}
