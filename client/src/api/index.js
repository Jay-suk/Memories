//to make http requests to the backend server
import axios from 'axios';

//this url points to the backend route
const url = 'http://localhost:5000/posts';

//fetchPosts
export const fetchPosts = () => axios.get(url);

//createPost
export const createPost = (newPost) => axios.post(url, newPost);

//updatePost
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

//delete post
export const deletePost = (id) => axios.delete(`${url}/${id}`);

//likePost
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);