import * as React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../views/home/home';

const Routers = (
  <Router >
    <div>
      <Switch>
        <Route path={'/'} exact component={Home} />
      </Switch>
    </div>
  </Router>
);

export default Routers;
