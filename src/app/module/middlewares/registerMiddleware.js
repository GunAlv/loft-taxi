import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { SET_REGISTER } from '../../common/constants/action-types';
import { getAuthProgress, getAuthStatus } from '../actions/auth';
import { setAuthStorage } from '../../common/utils/authStorage';

export const registerMiddleware = store => next => action => {
    if (action.type === SET_REGISTER) {
        store.dispatch(getAuthProgress(true));

        axios.post(`${baseAPI}register`, action.payload)
            .then(response => {
                const { data } = response;
                store.dispatch(getAuthProgress(false));

                if (!data.success) {
                    store.dispatch(getAuthStatus(false));

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

    return next(action);
};
