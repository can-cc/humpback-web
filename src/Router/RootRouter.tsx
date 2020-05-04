import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainRouter } from './MainRouter';
import { MindPlayGroundPage } from '../Page/XmindPlayGround/MindPlayGroundPage';
import { OAuthPage } from '../Page/OAuth/OAuthPage';
import { Router } from 'react-router';
import { appHistory } from '../common/history';

export function RootRouter() {
  return (
    <Router history={appHistory}>
      <Switch>
        <Route path="/mind-playground" component={MindPlayGroundPage} />
        <Route path="/oauth" component={OAuthPage} />
        <Route path="" component={MainRouter} />
      </Switch>
    </Router>
  );
}
