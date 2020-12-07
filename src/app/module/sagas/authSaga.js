import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { call, put } from 'redux-saga/effects';
import { setAuthError, setAuthProgress, setAuthStatus } from '../actions/auth';
import { deleteAuthStorage, setAuthStorage } from '../../common/utils/authStorage';
import { setRegisterError } from '../actions/register';

function fetchAuth(data) {
    return axios({
        method: 'POST',
        url: `${baseAPI}auth`,
        data,
    });
}

export function* setAuthSaga(action) {
    try {
        yield put(setAuthProgress(true));
        const { data } = yield call(fetchAuth, action.payload);

        if (data.success) {
            yield put(setAuthProgress(false));
            yield setAuthStorage(true, data.token);
            yield put(setAuthStatus(true, data.token));
        } else {
            console.error(data.error);
            yield put(setAuthProgress(false));
            yield put(setAuthStatus(false));
            yield put(setAuthError(data.error));
        }
    } catch (error) {
        console.error(error);
        yield put(setAuthProgress(false));
        yield put(setAuthStatus(false));

        throw new Error('Нет соединения с сервером!');
    }
}

export function* removeAuthSaga() {
    yield put(setAuthError(''));
    yield put(setRegisterError(''));
    yield put(setAuthStatus(false, undefined));
    yield deleteAuthStorage();
}
