import axios from 'axios';
import { setAlert } from './alert';
import { 
    GET_POSTS,
    POSTS_ERROR
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
 }