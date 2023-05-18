//implements the reducer functionality
//takes the state and action type and
//returns the new state based on the action type
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
export default (posts= [],action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...posts,action.payload];
        
        //traversing each post in the posts array and changing the content of the post whose id matches
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post) ;
        
        //filtering the posts array by including only those posts whose id does not matches with the one to be deleted
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
};