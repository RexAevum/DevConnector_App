import {
    CLEAR_PROFILE,
    DELETED_ACCOUNT,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
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

        dispatch(setAlert('Experience Added', 'success'));
        // If a new profile is created, forward user to dashboard
        history.push('/dashboard');

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

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        // create header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        // send put request to update exp
        const res = await axios.put('api/profile/experience', formData, config);
        // dispatch results - the json file that's returned from server
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        // dipatch a confirmation message to user
        dispatch (setAlert('Experience Updated', 'success'));
        // redirect
        history.push('/dashboard');
    } catch (error) {
        // print to user any errors returned from server
        const errors = error.response.data.errors;
        errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));

        dispatch({
            type: PROFILE_ERROR
        })
    }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
    } catch (error) {
        const errors = error.response.data.errors;
        errors.forEach(e => dispatch(setAlert(e.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR
        })
    }

};

// Delete experience
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        // alert user
        dispatch(setAlert('Experience Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};

// Delete experience
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        // alert user
        dispatch(setAlert('Education Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
};

// Delete account and profile
export const deleteAccount = () => async dispatch => {
    // Trigger a warning on the browser window to make sure user wants to delete
    if (window.confirm('Are you sure tha you wish to delete your account?\nThis action is permanent and cannot be undone!')){
        try {
            const res = await axios.delete(`/api/profile/`);
    
            dispatch({ type: CLEAR_PROFILE }); // delete user profile
            dispatch({ type: DELETED_ACCOUNT }); // delete user account

            // alert user
            dispatch(setAlert('Your Account Has Been Permanantly Deleted'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
    
    
};