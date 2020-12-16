import { fetchAuth } from '../API';
import { call, put } from 'redux-saga/effects';
import { setAuthError, setAuthLoading, setAuthStatus } from '../actions/auth';
import { deleteAuthStorage, setAuthStorage } from '../../common/utils/authStorage';
import { setRegisterError } from '../actions/register';

export function* setAuthSaga(action) {
    try {
        yield put(setAuthLoading(true));
        const { data } = yield call(fetchAuth, action.payload);

        if (data.success) {
            yield put(setAuthLoading(false));
            yield setAuthStorage(true, data.token);
            yield put(setAuthStatus(true, data.token));
        } else {
            console.error(data.error);
            yield put(setAuthLoading(false));
            yield put(setAuthStatus(false));
            yield put(setAuthError(data.error));
        }
    } catch (error) {
        console.error(error);
        yield put(setAuthLoading(false));
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
