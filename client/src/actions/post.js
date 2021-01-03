import axios from 'axios';
import { setAlert } from './alert';
import { ADD_COMMENT, REMOVE_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: { id }, // Payload contains post that we want to delete from our UI
        })

        dispatch(setAlert('Post Removed', 'success'));

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 

// Add post
export const addPost = formData => async dispatch => {
    // Set headers for the request
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts/`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data, // Payload contains data from response
        })

        dispatch(setAlert('Post Created', 'success'));

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 

// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    // Set headers for the request
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data, // Payload contains data from response (the comment)
        })

        dispatch(setAlert('Comment Added', 'success'));

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId, // Payload contains comment ID of comment that we want to delete
        })

        dispatch(setAlert('Comment Added', 'success'));

    } catch (e) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
} 

