import { 
    USER_UPDATED, 
    USER_ERROR, 
    USER_LOADED, 
    USER_FOUND,
    PASSWORD_UPDATED,
    FORGOT_ERROR 
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// create header for post 
const config = {
    headers: {
        'Content-Type' : 'application/json'
    }
};

// update current user
export const updateUser = (formData, history) => async dispatch => {
    try {
        // pass the updated form and make a request to server for update
        const res = await axios.post('/api/users/me/update', formData, config);

        dispatch({
            type: USER_UPDATED,
            payload: res.data
        })

        dispatch(setAlert('User Info Updated', 'success'));

        // reload user from server
        const user = await axios.get('/api/users/me');
        dispatch({
            type: USER_LOADED,
            payload: user.data
        })
        // redirect to dashboard
        history.push('/dashboard');



    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

// look up if user exists
export const forgot = (email) => async dispatch => {
    try {
        // create body
        const body = JSON.stringify({email});
        // make request
        const found = await axios.post('/api/users/forgot', body, config);

        if (found){
            dispatch({
                type: USER_FOUND,
                payload: true
            });
        }
    } catch (error) {
        dispatch({
            type: FORGOT_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// update forgotten password
export const forgotPassword = (email, password, history) => async dispatch => {
    try {
        // create body
        const body = JSON.stringify({ email, password });
        // make request
        const isUpdated = await axios.put('/api/users/forgot-password', body, config);

        if (isUpdated){
            dispatch({
                type: PASSWORD_UPDATED,
                payload: true 
            });
            dispatch(setAlert('Password Updated', 'success'));
            // redirect to login page
            history.push('/login');
        }
    } catch (error) {
        dispatch({
            type: FORGOT_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}