import axios from 'axios';
import { setAlert } from './alert'; // import alert system
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    // check if there is a token and reauthenticate
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        //
        const res = await axios.get('/api/auth');

        // send response
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Register user
export const register = ({ name, email, password }) => async dispatch => {
    // create a config with headers
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    };

    // convert body to json
    const body = JSON.stringify({ name, email, password });

    try {
        // make a post request to register user to server
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        // display an alert that the user has been registered
        setTimeout(() => dispatch(setAlert('User Registered Successfuly. Redirecting...', 'success')), 3000);
        dispatch(loadUser());
    } catch (error) {
        // get the errors array that will be sent back by the server
        const err = error.response.data.errors;

        // display all of the errors on the website
        if (err){
            err.forEach(e => {
                dispatch(setAlert(e.msg, 'danger'));
            });
        }

        // dispatch the status
        console.error(error);
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login user
export const login = ( email, password ) => async dispatch => {
    console.log(email, password);
    // set up head
    const config = {
        headers: {
            'Content-Type' : 'application/json' 
        }
    };

    // create request body and pass on the needed info
    const body = JSON.stringify({ email, password });
    //console.log(body);
    try {
        // authenticate user and await the response
        const res = await axios.post('/api/auth', body, config);

        // dispatch that the login is successful
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data // the payload is the returend info from server
        })

        // auth user right away
        dispatch(loadUser());
    } catch (err) {
        // get an array of errors
        const errors = err.response.data.errors; // == null ? null : err.response.data.errors;
        // print the errors on the page
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        // dispatch that the authentication failed
        dispatch({
            type: LOGIN_FAIL
        });
    }

};


// LOGOUT USER / clear profile
export const logout = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
};