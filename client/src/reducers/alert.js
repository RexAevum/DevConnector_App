// import action types
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
// set up an inital state
const initialState = [];

export default function(state = initialState, action){
    // destructure the action
    const { type, payload } = action;
    
    switch (type) {
        case SET_ALERT:
            // add the alert to the already existing state (initialState)
            return [...state, payload];
        case REMOVE_ALERT:
            // remove an alert from the state based on the alert id, which is passed using action
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}