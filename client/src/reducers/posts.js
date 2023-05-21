//implements the reducer functionality
//takes the state and action type and
//returns the new state based on the action type
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
export default (state = [],action) => {
    switch(action.type){
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
                posts: action.payload,
            };

        case CREATE:
            return [...state,action.payload];
        
        //traversing each post in the posts array and changing the content of the post whose id matches
        case UPDATE:
        case LIKE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post) ;
        
        //filtering the posts array by including only those posts whose id does not matches with the one to be deleted
        case DELETE:
            return state.filter((post) => post._id !== action.payload);
        default:
            return state;
    }
};