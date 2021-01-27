import {
    GET_POSTS,
    POSTS_ERROR,
    UPDATE_LIKES
} from '../actions/types';
const initalState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case POSTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? { ...post, likes: payload.likes } : post),
                loading: false
            }
        default:
            return state;
    }
}