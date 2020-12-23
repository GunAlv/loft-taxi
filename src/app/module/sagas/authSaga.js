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
            yield setAuthStorage(true, data.token);
            yield put(setAuthStatus(true, data.token));
        } else {
            yield put(setAuthError(data.error));
            throw new Error('Ошибка авторизации');
        }
    } catch (error) {
        console.error(error);
        yield put(setAuthStatus(false));
    } finally {
        yield put(setAuthLoading(false));
    }
}

export function* removeAuthSaga() {
    yield put(setAuthError(''));
    yield put(setRegisterError(''));
    yield put(setAuthStatus(false, undefined));
    yield deleteAuthStorage();
}
