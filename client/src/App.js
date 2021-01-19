import React, { Fragment } from 'react';
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


// now its a function for use with hooks
const App = () => {
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
}

export default App;
