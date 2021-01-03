import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Routes from './components/routing/Routes'

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
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route component={Routes} />
      </Switch>
      <Alert />
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
