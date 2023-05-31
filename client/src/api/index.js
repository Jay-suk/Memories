//to make http requests to the backend server
import axios from 'axios';

//this url points to the backend route
//https://memories-jay.onrender.com/
//const API = axios.create( {baseURL : 'http://localhost:5000'} );

const API = axios.create( {baseURL : 'https://memories-jay.onrender.com'} );
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//fetch Posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

//fetchPosts by Search
export const fetchPostsBySearch = (searchQuery) => 
    API.get(
        `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`
    );

//fetching a single post
export const fetchPost = (id) => API.get(`/posts/${id}`);

//create Post
export const createPost = (newPost) => API.post('/posts', newPost);

//update Post
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

//delete post
export const deletePost = (id) => API.delete(`/posts/${id}`);

//like Post
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


//comment Post
export const commentPost = (value,id) => API.post(`/posts/${id}/commentPost`, { value });

//sign in
export const signIn = (formData) => API.post('/user/signin', formData);

//sign up
export const signUp = (formData) => API.post('/user/signup', formData);