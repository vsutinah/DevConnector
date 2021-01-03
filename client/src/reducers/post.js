import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
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
        case GET_POST:
            // Return current state + payload containing post that we want to view/comment on
            return {
                ...state,
                post: payload,
                loading: false
            } 
        case ADD_POST:
            // Return current state + payload (our new post) appended to our posts array
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }

        case DELETE_POST:
            // Return current state + posts array excluding the post we want to delete
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload), // Return all posts except the post we want to delete
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
            // Return current state + error message from payload
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_COMMENT:
            // Return current state + current post state + payload (contains existing comments + the new comment)
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            }
        case REMOVE_COMMENT:
            // Return current state + current post state + comments state excluding comment that we want to delete
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload),
                    loading: false
                }
            }
        default:
            return state
    }   
}