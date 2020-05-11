import React from 'react';
import { Button } from '../../../Component/Button/Button';
import { CreatPageRequest, QueryPageListRequest } from '../../../redux/action/page-action';
import { AxiosSuccessAction } from '../../../redux/action/action';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TextSecondaryColor } from '../../../Constant/Color';
import { AppText } from '../../../Component/Typography/AppText';

export function RootPageCreator(props: { spaceId: string }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const createPage = () => {
    ((dispatch(
      CreatPageRequest({
        spaceId: props.spaceId,
        title: '',
      })
    ) as unknown) as Promise<AxiosSuccessAction>).then((action: AxiosSuccessAction) => {
      const pageId = action.payload.data;
      dispatch(
        QueryPageListRequest({
          spaceId: props.spaceId,
        })
      );
      history.push(`/space/${props.spaceId}?pageId=${pageId}`, {
        isNew: true,
      });
    });
  };
  return (
    <div style={{ paddingLeft: 3 }}>
      <Button onClick={createPage}>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8, fontSize: 12, color: TextSecondaryColor }} />
        <AppText inline size={14} bold>
          新建页面
        </AppText>
      </Button>
    </div>
  );
}
