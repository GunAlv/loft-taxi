import { fetchRegister } from '../API';
import { call, put } from 'redux-saga/effects';
import { setAuthLoading, setAuthStatus } from '../actions/auth';
import { deletePaymentStorage } from '../../common/utils/paymentStorage';
import { setPaymentData } from '../actions/payment';
import { setAuthStorage } from '../../common/utils/authStorage';
import { setRegisterError } from '../actions/register';

export function* setRegisterSaga(action) {
    try {
        yield put(setAuthLoading(true));
        const { data } = yield call(fetchRegister, action.payload);

        if (data.success) {
            yield deletePaymentStorage();
            yield put(setPaymentData({
                cardNumber: '',
                cardName: '',
                expiryDate: '',
                cvc: '',
            }));
            yield setAuthStorage(true, data.token);
            yield put(setRegisterError(''));
            yield put(setAuthStatus(true, data.token));
        } else {
            yield put(setAuthStatus(false));
            yield put(setRegisterError(data.error));
            throw new Error('Ошибка регистрации');
        }
    } catch(error) {
        console.log(error);
    } finally {
        yield put(setAuthLoading(false));
    }
}
