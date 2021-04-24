import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import logo from '../logo.svg';
import { Home, Login, Users } from '../pages';
import { PrivateRoute, NotFound, Topbar } from '../components';

export function App() {
  return (
    <Router history={history}>
      <div style={{ paddingTop: '2.9em' }}>
        <Topbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/users" component={Users} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
