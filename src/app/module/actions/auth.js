import {
    SET_AUTH,
    GET_AUTH_PROGRESS,
    GET_AUTH_STATUS,
    REMOVE_AUTH, GET_AUTH_ERROR,
} from '../../common/constants/action-types';

export const setAuth = (email, password) => ({
    type: SET_AUTH,
    payload: {
        email,
        password,
    },
});

export const getAuthProgress = (isProgress) => ({
    type: GET_AUTH_PROGRESS,
    payload: isProgress,
});

export const getAuthStatus = (isLoggedIn, token) => ({
    type: GET_AUTH_STATUS,
    payload: {
        isLoggedIn,
        token: token,
    },
});

export const getAuthError = (error) => ({
    type: GET_AUTH_ERROR,
    payload: error,
});

export const removeAuth = () => ({
    type: REMOVE_AUTH,
});
