import { AUTH, LOGOUT, START_LOADING, END_LOADING, REGISTER_USER_ERROR, HIDE_ERROR } from '../constants/actionTypes';

export default (
    state = { authData: null, showAlert: false, isLoading: false, message: "" },
    action
    ) => {
    switch(action.type)
    {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case REGISTER_USER_ERROR:
            return { ...state, showAlert: true, message: action?.payload };

        case HIDE_ERROR:
            return { ...state, showAlert: false, message: "" };

        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
            
        default:
            return state;
    }
}