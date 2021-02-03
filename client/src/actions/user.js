import { USER_UPDATED, USER_ERROR, GET_USER, USER_LOADED } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';

// update current user
export const updateUser = (formData, history) => async dispatch => {
    try {
        // create header for post 
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        // pass the updated form and make a request to server for update
        const res = await axios.post('/api/users/me/update', formData, config);

        dispatch({
            type: USER_UPDATED,
            payload: res.data
        })

        dispatch(setAlert('User Info Updated', 'success'));

        // reload user
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
        })
    }
};