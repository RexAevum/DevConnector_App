import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    USER_UPDATED,
    USER_ERROR,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    DELETED_ACCOUNT
} from '../actions/types';

// set the inital state 
const initialState = {
    token: localStorage.getItem('token'), // find the token in local storage
    isAuthenticated: null, // allow access to the app
    loading: true, // check if the app is waiting for anything to load
    user: null // pass in user info
};


export default function(state = initialState, action){
    // destructure action
    const { type, payload } = action;
    
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case USER_UPDATED:
            // set the token
            localStorage.setItem('token', payload.token);
            // updated the state
            return {
                ...state, // copy the existing state
                ...payload, // copy the action payload
                isAuthenticated: true, // set that the user has been authenticated
                loading: false // loading is done
            }
        case USER_ERROR:
            return {
                ...state, // copy the current state
                token: null, // set the token in the state to null
                isAuthenticated: false, // user has not been authenticated
                loading: false // not waiting for anything to load
            }
        case REGISTER_FAIL: // all will do the same 
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETED_ACCOUNT:
            // if registration failed, remove the token
            localStorage.removeItem('token');
            return {
                ...state, // copy the current state
                token: null, // set the token in the state to null
                isAuthenticated: false, // user has not been authenticated
                loading: false // not waiting for anything to load
            }
        default:
            return state;
    }
}