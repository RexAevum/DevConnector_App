// Set up state managment for profile

import {
    PROFILE_ERROR,
    GET_PROFILE,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from '../actions/types';


const initialState = {
    profile: null, // current logged in user and user that you are visiting 
    profiles: [], // all the user profiles that will be displayed
    repos: [], // github repos will be placed here
    loading: true, // check if it is waiting for anything
    error: {} // return any errors
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    //
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case GET_REPOS:
            return {
                type: GET_REPOS,
                repos: payload,
                loading: false 
            }
        default:
            return state;
    }
}