// Function that takes in any state that relates to alerts and actions
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

export default function(state = initialState, action) {
    // Action contains payload w/ data and the type (which is what we'll evaluate)
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT: 
        // Return array of states with new payload & new alert
            return [...state, payload]; 
        case REMOVE_ALERT:
            // Filter through and return all alerts except the one that matches payload
            return state.filter(alert => alert.id !== payload); 
        default:
            return state;
    }   
}