import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';
// Initial state for Profile component
const initialState = {
    profile: null, // Will store profile data of currently logged in user, or queried user's profile
    profiles: [], // For profile listing page
    repos: [],
    loading: true,
    error: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE:
            // Return current state + profile payload
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            // Return current state + error message payload
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}