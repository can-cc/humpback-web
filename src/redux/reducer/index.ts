import { combineReducers } from 'redux';
import { SpaceReducer, SpaceState } from './space/space-reducer';

export interface AppRootState {
  space: SpaceState;
}

export const rootReducer = combineReducers({
  space: SpaceReducer
});
