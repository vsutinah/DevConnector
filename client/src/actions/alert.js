import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    // Call SET_ALERT from our alert reducer to create an alert
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })
    // Dispatch REMOVE_ALERT from our alert reducer to timeout the created alerts
    setTimeout(() => dispatch({ 
        type: REMOVE_ALERT, 
        payload: id }), timeout);
};