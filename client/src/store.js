import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// Initialize object to store all initial states for store
const initialState = {};
// The middleware for our store
const middleware = [thunk];
// Create store for Redux
const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;