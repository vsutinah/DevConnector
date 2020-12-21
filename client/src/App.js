import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Check if token exists in local storage
// If yes, add x-auth-token to our header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Use the useEffect hook to load our user whenever our props update?
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    // Pass in our Redux store into the Provider as props
    <Provider store={store}> 
    <Router>
      <Fragment>
      <Navbar />
      <Route exact path="/" component={ Landing } />
      <Alert />
      <section className="container">
        <Switch>
          {/* Routes are equivalent to <a> tags? */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
