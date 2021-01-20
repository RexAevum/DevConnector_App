import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from './components/layout/Alert';
// Redux
import { Provider } from 'react-redux'; // all components will be able to access the store
import store from './store';// the imported store using redux
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Check if the user is authenticated every time
if(localStorage.token){
  setAuthToken(localStorage.token)
}

// now its a function for use with hooks
const App = () => {
  // everytime app loads, it will check if there is a token already
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}> 
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path='/' component={Landing}/>
          <section className="container">
            <Switch>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/login' component={Login}></Route>
            </Switch>
            <Alert />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
