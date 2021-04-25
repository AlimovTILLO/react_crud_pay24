import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { history } from '../helpers';
import logo from '../logo.svg';
import { Home, Login, Passports } from '../pages';
import { PrivateRoute, NotFound, Topbar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationActions } from '../actions';

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location, action) => {
    });
    if (localStorage.getItem('token')) {
      dispatch(authenticationActions.getCurrentUser())
    }
  }, []);

  return (
      <Router history={history}>
          <Topbar />
          <Switch>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Passports} />
            <Route component={NotFound} />
          </Switch>
      </Router>
  );
}
