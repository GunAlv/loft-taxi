import { LOFT_TAXI_AUTH_STORAGE } from '../constants/loft-taxi-auth-storage'

export const setAuthStorage = (isLoggedIn, token) => {
    return localStorage.setItem(LOFT_TAXI_AUTH_STORAGE, JSON.stringify({
        isLoggedIn,
        token,
    }));
};

export const getFromAuthStorage = (value) => {
    const storage = JSON.parse(localStorage.getItem(LOFT_TAXI_AUTH_STORAGE));
    return storage ? storage[value] : undefined;
};

export const deleteAuthStorage = () => {
    return localStorage.removeItem(LOFT_TAXI_AUTH_STORAGE);
};
