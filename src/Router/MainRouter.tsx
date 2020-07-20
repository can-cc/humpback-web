import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { SpacePage } from '../Page/Space/SpacePage';
import { AppHeader } from '../Component/AppHeader/AppHeader';
import { SpaceListPage } from '../Page/SpaceList/SpaceListPage';
import { DashboardPage } from "../Page/Dashboard/DashboardPage";

export function MainRouter() {
  return (
    <>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/overview" component={DashboardPage} />
          <Route path="/spaces" component={SpaceListPage} />
          <Route path="/space/:spaceId" component={SpacePage} />
          <Route path="*" component={() => <Redirect to="/overview" />} />
        </Switch>
      </Router>
    </>
  );
}
