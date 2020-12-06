import { LOFT_TAXI_AUTH_STORAGE } from '../constants/storage';

export const setAuthStorage = (isLoggedIn, token) => {
    return localStorage.setItem(LOFT_TAXI_AUTH_STORAGE, JSON.stringify({
        isLoggedIn,
        token,
    }));
};

export const getFromAuthStorage = (value) => {
    const storage = JSON.parse(localStorage.getItem(LOFT_TAXI_AUTH_STORAGE));
    return storage?.[value];
};

export const deleteAuthStorage = () => {
    const storage = JSON.parse(localStorage.getItem(LOFT_TAXI_AUTH_STORAGE));
    if (storage) return localStorage.removeItem(LOFT_TAXI_AUTH_STORAGE);
};
