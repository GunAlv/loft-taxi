import {
    SET_AUTH_ERROR,
    SET_AUTH_LOADING,
    SET_AUTH_STATUS,
} from '../../common/constants/action-types';
import { getFromAuthStorage } from '../../common/utils/authStorage';

const initialState = {
    isLoading: false,
    isLoggedIn: getFromAuthStorage('isLoggedIn') || false,
    token: getFromAuthStorage('token') || null,
    authError: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case SET_AUTH_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.token,
            };

        case SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
