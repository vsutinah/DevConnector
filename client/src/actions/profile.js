import axios from 'axios';
import { setAlert } from './alert';
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED } from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me'); // Load profile using user ID in token
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data // Contains profile data
        })
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
}

// Create / update a user's profile
// Parameters: submitted formData & history object that redirects us to client side route
// Edit parameter tells us whether we are editting or creating the profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        // Set request headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Send POST request to api/profile to create/edit profile
        const res = await axios.post('api/profile', formData, config)

        // Dispatch GET_PROFILE action
        dispatch({
            type: GET_PROFILE,
            payload: res.data // Contains profile data
        })

        // Dispatch SET_ALERT action to create alert for profile edit/creation
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }

    } catch (e) {
        const errors = e.response.data.errors; // Array of errors
        if (errors) {
            // Dispatch SET_ALERT action for every error in array
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
}

// Add experience to profile
export const addExperience = (formData, history) => async dispatch => {
    try {
        // Set request headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Send PUT request to api/profile/experience to add experience
        const res = await axios.put('api/profile/experience', formData, config)

        // Dispatch GET_PROFILE action
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // Contains profile data
        })

        // Dispatch SET_ALERT action to create alert for profile edit/creation
        dispatch(setAlert('Experience added', 'success'));

        // Redirect to dashboard
        history.push('/dashboard');

    } catch (e) {
        const errors = e.response.data.errors; // Array of errors
        if (errors) {
            // Dispatch SET_ALERT action for every error in array
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
}

// Add experience to profile
export const addEducation = (formData, history) => async dispatch => {
    try {
        // Set request headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Send PUT request to api/profile/experience to add experience
        const res = await axios.put('api/profile/education', formData, config)

        // Dispatch GET_PROFILE action
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // Contains profile data
        })

        // Dispatch SET_ALERT action to create alert for profile edit/creation
        dispatch(setAlert('Education added', 'success'));

        // Redirect to dashboard
        history.push('/dashboard');

    } catch (e) {
        const errors = e.response.data.errors; // Array of errors
        if (errors) {
            // Dispatch SET_ALERT action for every error in array
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
}

// Delete experience
// Use experience ID as argument for action
export const deleteExperience = id => async dispatch => {
    try {
        // Send DELETE request to api/profile/experience/:id
        const res = await axios.delete(`api/profile/experience/${id}`)
        
        // Dispatch UPDATE_PROFILE action to delete experience fm profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        // Dispatch SET_ALERT action to create alert for deleting experience
        dispatch(setAlert('Experience deleted', 'success'));

    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
}

// Delete education
// Use education ID as argument for action
export const deleteEducation = id => async dispatch => {
    try {
        // Send DELETE request to api/profile/education/:id
        const res = await axios.delete(`api/profile/education/${id}`)
        
        // Dispatch UPDATE_PROFILE action to delete education fm profile
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        // Dispatch SET_ALERT action to create alert for deleting education
        dispatch(setAlert('Education deleted', 'success'));

    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
}

// Delete account and profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure you want to delete your account?')) {
        try {
            // Send DELETE request to api/profile
            const res = await axios.delete('api/profile')
            
            // Dispatch CLEAR_PROFILE action to delete profile
            dispatch({
                type: CLEAR_PROFILE
            })

            // Dispatch ACCOUNT_DELETED action to delete acct
            dispatch({
                type: ACCOUNT_DELETED
            })
    
            // Dispatch SET_ALERT action to create alert for deleting account
            dispatch(setAlert('Account has been permanently deleted', 'success'));
    
        } catch (e) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: e.response.statusText, status: e.response.status }
            })
        }
    }
}