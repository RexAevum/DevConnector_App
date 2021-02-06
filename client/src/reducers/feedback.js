import {
    GET_FEEDBACKS,
    ADD_FEEDBACK,
    UPDATE_FEEDBACK,
    ERROR_FEEDBACK
} from '../actions/types';

const initalState = {
    feedbacks: [],
    loading: true,
    error: {}
}

export default function(state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_FEEDBACKS:
            return {
                ...state,
                feedbacks: payload,
                loading: false
            };
        case ADD_FEEDBACK:
            return {
                ...state,
                feedbacks: [payload, ...state.feedbacks], // keep all of the old feedbacks and add the new feedback
                loading: false
            };
        case ERROR_FEEDBACK:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_FEEDBACK:
            return {
                ...state,
                feedbacks: state.feedbacks.map(feedback => feedback._id === payload.feedbackId ? { ...feedback, likes: payload.likes } : feedback),
                loading: false
            }
        default:
            return state;
    }
}