// Create a PrivateRout that will prevent users from accessing routs that they need to be authenticated for

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// components passed from App.js and rest of the arguments from a route
const PrivateRoute = ({ component: Component, auth, ...rest }) => 
// This will take care of the issue where non authenticated users can see the dashboard, if they are not auth they will be sent to the login page
// if they are auth, it will rout them wherever they wanted to go originaly when making the request
(
    <Route {...rest} render={props => !auth.isAuthenticated && !auth.loading ? (<Redirect to='/'/>) : (<Component {...props} />)}/>
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);

