import axios from 'axios';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
    // Check if token exists in local storage
    // If yes, add x-auth-token to our header
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.get('/api/auth');
        
        // If response is successful, send USER_LOADED action to auth reducer
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (e) {
        // Else,  send AUTH_ERROR action
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Register User
export const register = ({ name, email, password }) => async dispatch => {
    // Create config for request headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        // If response is OK (not 400/404/etc), dispatch action to reducer
        dispatch({
            // Send action with payload containing data from our response
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (e) {
        const errors = e.response.data.errors; // Array of errors
        if (errors) {
            // Dispatch SET_ALERT action for every error in array
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        })
        
    }

}

// Login User
export const login = ( email, password ) => async dispatch => {
    // Create config for request headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        // If response is OK (not 400/404/etc), dispatch action to reducer
        dispatch({
            // Send action with payload containing data from our response
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (e) {
        const errors = e.response.data.errors; // Array of errors
        if (errors) {
            // Dispatch SET_ALERT action for every error in array
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        })
        
    }

}