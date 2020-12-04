import authReducer from '../../module/reducers/auth-reducer';
import { getFromAuthStorage } from '../../common/utils/authStorage';
import { GET_AUTH_ERROR, GET_AUTH_PROGRESS, GET_AUTH_STATUS, SET_AUTH } from '../../common/constants/action-types';

const initialState = {
    isProgress: false,
    isLoggedIn: getFromAuthStorage('isLoggedIn') || false,
    token: getFromAuthStorage('token') || undefined,
    authError: '',
};

describe('Auth Reducer', () => {
    it('Should return the initial state', () => {
        expect(
            authReducer(undefined, {}))
                .toEqual({
                    ...initialState
                })
    });

    it('Should handle GET_AUTH_PROGRESS', () => {
        expect(
            authReducer(undefined, {
                type: GET_AUTH_PROGRESS,
                payload: true,
            }))
            .toEqual({
                ...initialState,
                isProgress: true,
            })

        expect(
            authReducer(undefined, {
                type: GET_AUTH_PROGRESS,
                payload: false,
            }))
            .toEqual({
                ...initialState,
                isProgress: false,
            })
    });

    it('Should handle GET_AUTH_STATUS', () => {
        expect(
            authReducer(undefined, {
                type: GET_AUTH_STATUS,
                payload: {
                    isLoggedIn: true,
                    token: 'feu37',
                },
            }))
            .toEqual({
                ...initialState,
                isLoggedIn: true,
                token: 'feu37',
            })

        expect(
            authReducer(undefined, {
                type: GET_AUTH_STATUS,
                payload: {
                    isLoggedIn: false,
                    token: 'token',
                },
            }))
            .toEqual({
                ...initialState,
                isLoggedIn: false,
                token: 'token',
            })
    });

    it('Should handle GET_AUTH_ERROR', () => {
        expect(
            authReducer(undefined, {
                type: GET_AUTH_ERROR,
                payload: 'Ошибка!',
            }))
            .toEqual({
                ...initialState,
               authError: 'Ошибка!',
            })
    });
});
