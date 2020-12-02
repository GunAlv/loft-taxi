import {
    GET_AUTH_ERROR,
    GET_AUTH_PROGRESS,
    GET_AUTH_STATUS,
} from '../../common/constants/action-types';
import { getFromAuthStorage } from '../../common/utils/authStorage';

const initialState = {
    isProgress: false,
    isLoggedIn: getFromAuthStorage('isLoggedIn') || false,
    token: getFromAuthStorage('token') || undefined,
    authError: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_PROGRESS:
            return {
                ...state,
                isProgress: action.payload,
            };

        case GET_AUTH_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.token,
            };

        case GET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
