import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { SpacePage } from '../Page/Space/SpacePage';
import { AppHeader } from '../Component/AppHeader/AppHeader';
import { SpaceListPage } from '../Page/SpaceList/SpaceListPage';

export function MainRouter() {
  return (
    <>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/spaces" component={SpaceListPage} />
          <Route path="/space/:spaceId" component={SpacePage} />
          <Route path="*" component={() => <Redirect to="/spaces" />} />
        </Switch>
      </Router>
    </>
  );
}
