import { CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, GET_REPOS } from '../actions/types';
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
        case UPDATE_PROFILE:
            // Return current state + profile payload
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            // Return current state + list of all profiles in payload
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_REPOS:
            // Return current state + all repos in the payload
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case PROFILE_ERROR:
            // Return current state + error message payload
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            // Return current state + remove user's profile & repos
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}