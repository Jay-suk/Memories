import axios from 'axios';

//this url points to the backend route
const url = 'http://localhost:5000/posts';

//send a get request to the url to retrieve data
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);