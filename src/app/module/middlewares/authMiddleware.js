import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { REMOVE_AUTH, SET_AUTH } from '../../common/constants/action-types';
import { getAuthError, getAuthProgress, getAuthStatus } from '../actions/auth';
import { deleteAuthStorage, setAuthStorage } from '../../common/utils/authStorage';
import { getRegisterError } from '../actions/register';

export const authMiddleware = store => next => action => {
    if (action.type === SET_AUTH) {
        store.dispatch(getAuthProgress(true));

        axios.post(`${baseAPI}auth`, action.payload)
            .then(response => {
                const { data } = response;
                store.dispatch(getAuthProgress(false));

                if (!data.success) {
                    store.dispatch(getAuthStatus(false));
                    store.dispatch(getAuthError(data.error));

                    return;
                }

                setAuthStorage(true, data.token);
                store.dispatch(getAuthStatus(true, data.token));
            })
            .catch(error => {
                console.log(error);
                store.dispatch(getAuthProgress(false));
                store.dispatch(getAuthStatus(false));
            })
    }

    if (action.type === REMOVE_AUTH) {
        store.dispatch(getAuthError(''));
        store.dispatch(getRegisterError(''));
        store.dispatch(getAuthStatus(false, undefined));
        deleteAuthStorage();
    }

    return next(action);
};
