import { AUTH, START_LOADING, END_LOADING, REGISTER_USER_ERROR } from '../constants/actionTypes';
import * as api from '../api/index.js';

//signIn and signUp actions for manual login using jwt

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        dispatch({ type: END_LOADING });
        navigate('/');
    } catch (error) {
        dispatch({
            type: REGISTER_USER_ERROR,
            payload: error.response.data.message,
          });
        dispatch({ type: END_LOADING });
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
    
        dispatch({ type: END_LOADING });
        navigate('/');
    } catch (error) {
        dispatch({
        type: REGISTER_USER_ERROR,
        payload: error.response.data.message,
        });
        dispatch({ type: END_LOADING });
    }
};