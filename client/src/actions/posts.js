import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST,CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

//Action Creators -- functions that return action
//action is an object with type and a payload


export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ 
            type: FETCH_POST, 
            payload: {post: data} 
        });
        dispatch({ type:END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type:END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data }  });
        dispatch({ type:END_LOADING });
        // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type:START_LOADING });
        const { data } = await api.createPost(post);

        navigate(`/posts/${data._id}`);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type:END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.likePost(id,user?.token);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async(dispatch) => {
    try {
        const { data } =  await api.commentPost(value,id);
        
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};