import {
    USER_FOUND,
    PASSWORD_UPDATED,
    FORGOT_ERROR
} from '../actions/types';

const initialState = {
    userFound: false,
    passwordUpdated: false,
    loading: true,
    error: {}
};

export default function (state = initialState, action){
    const { type, payload} = action;

    switch (type) {
        case USER_FOUND:
            return {
                ...state,
                userFound: payload,
                loading: false
            }
        case PASSWORD_UPDATED:
            return {
                ...state,
                passwordUpdated: payload,
                loading: false
            }
        case FORGOT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}