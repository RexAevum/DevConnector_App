import axios from 'axios';
import { setAlert } from './alert';
import { 
    GET_FEEDBACKS,
    ADD_FEEDBACK,
    UPDATE_FEEDBACK,
    ERROR_FEEDBACK
 } from './types';


 // Get all feedbacks
 export const getFeedbacks = () => async dispatch => {
     try {
         // get posts
         const res = await axios.get('/api/feedback');

         dispatch({
             type: GET_FEEDBACKS,
             payload: res.data
         });
     } catch (error) {
         dispatch({
             type: ERROR_FEEDBACK,
             payload: {msg: error.response.statusText, status: error.response.status}
         });
     }
 };

  // Add like
  export const addLike = (feedbackId) => async dispatch => {
    try {
        // get posts
        const res = await axios.put(`/api/feedback/like/${feedbackId}`);

        dispatch({
            type: UPDATE_FEEDBACK,
            payload: { feedbackId, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: ERROR_FEEDBACK,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

 // Remove like
 export const removeLike = (feedbackId) => async dispatch => {
   try {
       // get posts
       const res = await axios.put(`/api/feedback/unlike/${feedbackId}`);

       dispatch({
           type: UPDATE_FEEDBACK,
           payload: { feedbackId, likes: res.data}
       });
   } catch (error) {
       dispatch({
           type: ERROR_FEEDBACK,
           payload: {msg: error.response.statusText, status: error.response.status}
       });
   }
};

  // Add feedback
  export const addFeedback = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    try {
        // add post
        const res = await axios.post(`/api/feedback`, formData, config);

        dispatch({
            type: ADD_FEEDBACK,
            payload: res.data
        });

        dispatch(setAlert('Feedback Post Created', 'success'));
    } catch (error) {
        dispatch({
            type: ERROR_FEEDBACK,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};