import {
    GET_POSTS,
    POSTS_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST
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
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts], // keep all of the old posts and add the new post
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload), // drop the post with the passed ID from the state
                loading: false
            }
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