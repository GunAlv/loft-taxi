import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { REMOVE_AUTH, SET_AUTH } from '../../common/constants/action-types';
import { setAuthError, setAuthProgress, setAuthStatus } from '../actions/auth';
import { deleteAuthStorage, setAuthStorage } from '../../common/utils/authStorage';
import { setRegisterError } from '../actions/register';

export const authMiddleware = store => next => action => {
    if (action.type === SET_AUTH) {
        store.dispatch(setAuthProgress(true));

        axios.post(`${baseAPI}auth`, action.payload)
            .then(response => {
                const { data } = response;
                store.dispatch(setAuthProgress(false));

                if (!data.success) {
                    store.dispatch(setAuthStatus(false));
                    store.dispatch(setAuthError(data.error));

                    return;
                }

                setAuthStorage(true, data.token);
                store.dispatch(setAuthStatus(true, data.token));
            })
            .catch(error => {
                console.log(error);
                store.dispatch(setAuthProgress(false));
                store.dispatch(setAuthStatus(false));
            })
    }

    if (action.type === REMOVE_AUTH) {
        store.dispatch(setAuthError(''));
        store.dispatch(setRegisterError(''));
        store.dispatch(setAuthStatus(false, undefined));
        deleteAuthStorage();
    }

    return next(action);
};
