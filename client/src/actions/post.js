import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 

// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`); // Payload contains post that we liked, and the array of likes in post

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        })

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }, // Payload contains post that we unliked, and the array of likes in post
        })

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 