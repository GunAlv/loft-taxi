import {
    SET_AUTH,
    SET_AUTH_LOADING,
    SET_AUTH_STATUS,
    SET_AUTH_ERROR,
    REMOVE_AUTH,
} from '../../common/constants/action-types';

export const setAuth = (email, password) => ({
    type: SET_AUTH,
    payload: {
        email,
        password,
    },
});

export const setAuthLoading = (isLoading) => ({
    type: SET_AUTH_LOADING,
    payload: isLoading,
});

export const setAuthStatus = (isLoggedIn, token) => ({
    type: SET_AUTH_STATUS,
    payload: {
        isLoggedIn,
        token: token,
    },
});

export const setAuthError = (error) => ({
    type: SET_AUTH_ERROR,
    payload: error,
});

export const removeAuth = () => ({
    type: REMOVE_AUTH,
});
