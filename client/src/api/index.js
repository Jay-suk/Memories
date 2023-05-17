//to make http requests to the backend server
import axios from 'axios';

//this url points to the backend route
const url = 'http://localhost:5000/posts';

//function to send a get request to the url to retrieve data and return the response
export const fetchPosts = () => axios.get(url);
//takes newPost as argument and sends a post request to the url
// with newPost as request and returns the response
export const createPost = (newPost) => axios.post(url, newPost);

//updatePost
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

//delete post
export const deletePost = (id) => axios.delete(`${url}/${id}`);

//likePost
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);