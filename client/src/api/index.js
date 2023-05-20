//to make http requests to the backend server
import axios from 'axios';

/*this url points to the backend route
const url = 'http://localhost:5000/posts';*/

const API = axios.create( {baseURL : 'http://localhost:5000'} );

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//function to send a get request to the url to retrieve data and return the response
export const fetchPosts = () => API.get('/posts');
//takes newPost as argument and sends a post request to the url
// with newPost as request and returns the response
export const createPost = (newPost) => API.post('/posts', newPost);

//updatePost
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

//delete post
export const deletePost = (id) => API.delete(`/posts/${id}`);

//likePost
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//sign in
export const signIn = (formData) => API.post('/user/signin', formData);

//sign up
export const signUp = (formData) => API.post('/user/signup', formData);