import { AxiosResponse } from 'axios';

export interface AppAction {
  type: string;
  payload: any;
  meta?: any;
  error?: boolean;
}

export interface AxiosSuccessAction extends AppAction {
  payload: AxiosResponse;
  meta?: {
    previousAction: AppAction;
  };
}
