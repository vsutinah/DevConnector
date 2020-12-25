import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from '../actions/types';

const initialState = {
    posts: [],
    post: null, 
    loading: true,
    error: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_POSTS:
            // Return current state + payload in posts array
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case UPDATE_LIKES:
            // Return current state + post that we selected, with the like value manipulated as needed
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? 
                    { ...post, likes: payload.likes } : post),
                loading: false,

            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }   
}