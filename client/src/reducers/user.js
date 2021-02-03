import {
    USER_ERROR,
    GET_USER,
    USER_UPDATED
} from '../actions/types';

const initialState = {
    user: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action){
    const { type, payload} = action;

    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case USER_UPDATED:
            return {
                ...state,
                user: payload,
                loading: false
            }
            break;
        case USER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default:
            return state;
    }
}