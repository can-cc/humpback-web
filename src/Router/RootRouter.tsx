import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SpacePage } from '../Page/Space/SpacePage';

export function RootRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/space" component={SpacePage} />
      </Switch>
    </Router>
  );
}
