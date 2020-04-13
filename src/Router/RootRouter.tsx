import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainRouter } from './MainRouter';
import { MindPlayGroundPage } from '../Page/XmindPlayGround/MindPlayGroundPage';

export function RootRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/mind-playground" component={MindPlayGroundPage} />
        <Route path="" component={MainRouter} />
      </Switch>
    </Router>
  );
}
