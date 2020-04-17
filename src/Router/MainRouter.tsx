import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { SpacePage } from '../Page/Space/SpacePage';
import { AppHeader } from '../Component/AppHeader/AppHeader';

export function MainRouter() {
  return (
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/space" component={SpacePage} />
          <Route path="*" component={() => <Redirect to="/space" />} />
        </Switch>
      </Router>
    </>
  );
}
