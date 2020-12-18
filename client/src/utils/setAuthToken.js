import axios from 'axios';

// Checks if token exists in local storage
// If yes, set x-auth-token in the req header
// Else, remove x-auth-token from req header
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.default.headers.common['x-auth-token'];
    }
}

export default setAuthToken;