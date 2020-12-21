import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'), // Token is stored in local storage
    isAuthenticated: null, // Will be set to true when authenticated; will help us show stuff only logged in users can see
    loading: true, // Will set to false after loading is completed
    user: null // Will be set as the user data after it is retrieved from our backend's api/auth route
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, payload } = action; // Destructure action

    switch(type) {
        // If user loading is successful
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload // Set user data from payload in state
            }
        // If registration/login is successful
        case REGISTER_SUCCESS: 
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token); // Set token with the payload
            return {
                ...state,
                ...payload,
                isAuthenticated: true, 
                loading: false
            }
        // If any auth (register/login/etc) fails,
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            // Remove anything in localstorage in the token
            localStorage.removeItem('token');
            return {
                // Revert state to initial state
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false // We still set it to false, since it will be done loading
            }
        default:
            return state;
    }   
}