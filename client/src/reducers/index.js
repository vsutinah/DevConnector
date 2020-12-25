import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// Takes in an object that has any reducers we create
// And stores them in 1 place
export default combineReducers({
    alert,
    auth,
    profile,
    post
});