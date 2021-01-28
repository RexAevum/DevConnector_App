import axios from 'axios';
import { setAlert } from './alert';
import { 
    DELETE_POST,
    GET_POSTS,
    POSTS_ERROR,
    UPDATE_LIKES,
    ADD_POST
 } from './types';


 // Get posts
 export const getPosts = () => async dispatch => {
     try {
         // get posts
         const res = await axios.get('/api/posts');

         dispatch({
             type: GET_POSTS,
             payload: res.data
         });
     } catch (error) {
         dispatch({
             type: POSTS_ERROR,
             payload: {msg: error.response.statusText, status: error.response.status}
         });
     }
 };

 // Add like
 export const addLike = (postId) => async dispatch => {
     try {
         // get posts
         const res = await axios.put(`/api/posts/like/${postId}`);

         dispatch({
             type: UPDATE_LIKES,
             payload: { postId, likes: res.data}
         });
     } catch (error) {
         dispatch({
             type: POSTS_ERROR,
             payload: {msg: error.response.statusText, status: error.response.status}
         });
     }
 };

  // Remove like
  export const removeLike = (postId) => async dispatch => {
    try {
        // get posts
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: POSTS_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

  // Delete post
  export const deletePost = (id) => async dispatch => {
    try {
        // get posts
        const res = await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POSTS_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

  // Add post
  export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    try {
        // add post
        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (error) {
        dispatch({
            type: POSTS_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};