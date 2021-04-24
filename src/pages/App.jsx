import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { history } from '../helpers';
import logo from '../logo.svg';
import { Home, Login, Passports } from '../pages';
import { PrivateRoute, NotFound, Topbar } from '../components';

export function App() {
  return (
    <Router history={history}>
      <div style={{ paddingTop: '2.9em' }}>
        <Topbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Passports} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
