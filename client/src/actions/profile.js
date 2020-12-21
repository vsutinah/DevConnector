import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profiles/me'); // Load profile using user ID in token

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
}
