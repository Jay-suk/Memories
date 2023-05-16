//files imported -- reducer/posts.js
//combineReducers - allows binding multiple reducer into a single reducer function
import { combineReducers } from "redux";
import posts from './posts';
//combining reducers
export default combineReducers({ posts }); 