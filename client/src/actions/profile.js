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
}