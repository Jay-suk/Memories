//implements the reducer functionality
//takes the state and action type and
//returns the new state based on the action type
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';
export default (state = { isLoading: true, posts: [] } ,action) => {
    switch(action.type){

        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data,
            };

        case FETCH_POST:
            return {
                ...state,
                post: action.payload.post,
            };

        case CREATE:
            return { ...state, posts : [...state.posts,action.payload] } ;
        
        //traversing each post in the posts array and changing the content of the post whose id matches
        case UPDATE:
        case LIKE:
            return { ...state , posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        
        case COMMENT:
            return { 
                ...state, 
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id) {
                        return action.payload;
                    }
                    else {
                        return post;
                    }
                })
            };

        //filtering the posts array by including only those posts whose id does not matches with the one to be deleted
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};