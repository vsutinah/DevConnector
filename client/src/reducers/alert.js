// Reducer that controls the state of our alerts depending on the action
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    // Action contains payload w/ data and the type (which is what we'll evaluate)
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT: // Type that tells us to generate alert
        // Return a copy of all existing alert states + the new alert in the payload
            return [...state, payload]; 
        case REMOVE_ALERT: // Type that tells us to remove a specific alert
            // Filter through and return all alerts except the one that matches payload
            return state.filter(alert => alert.id !== payload); 
        default:
            return state;
    }   
}
