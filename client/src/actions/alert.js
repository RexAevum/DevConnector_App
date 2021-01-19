import {v4 as uuidv4}  from 'uuid'; // specify which uuid versions we need (doesnt have a default export)
import { SET_ALERT, REMOVE_ALERT } from './types';

// dispatch is enabled by thunk
export const setAlert = (msg, alertType, timeOut = 5000) => dispatch =>{
    // generate uuid
    const id = uuidv4();
    // send the 
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeOut);
};

export default setAlert;