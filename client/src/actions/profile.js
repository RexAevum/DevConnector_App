import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';
import axios from 'axios';
import { setAlert } from './alert';


// Get current user profile
export const getCurrentProfile = () => async dispatch => {
    //
    try {
        // get user profile
        const res = await axios.get('/api/profile/me');
        // dsipatch that the user has been retrieved and send back user data
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            error: {
                msg : error.response.statusText,
                status: error.response.status
            }
        });
    }
};

// Create or update profile
// history -> will have a push method to redirect to a client side route
export const createOrUpdateProfile = (formData, history, edit = false) => async dispatch => {

    try {
        // set up header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        // set up body -> formData
        // make a request
        const res = await axios.post('/api/profile', formData, config);

        //
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'));

        // If a new profile is created, forward user to dashboard
        if (!edit){
            history.push('/dashboard');
        }

    } catch (error) {
        // Print errors on the webapp page
        const errors = error.response.data.errors;

        if (errors){
            errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
        }
        // if error setting profile
        dispatch({
            type: PROFILE_ERROR,
            error : {
                msg : error.response.statusText,
                status: error.response.status
            }
        });
    }
};