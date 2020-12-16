import { fetchRegister } from '../API';
import { call, put } from 'redux-saga/effects';
import { setAuthLoading, setAuthStatus } from '../actions/auth';
import { deletePaymentStorage } from '../../common/utils/paymentStorage';
import { setPaymentData } from '../actions/payment';
import { setAuthStorage } from '../../common/utils/authStorage';
import { setRegisterError } from '../actions/register';

export function* setRegisterSaga(action) {
    try {
        const { data } = yield call(fetchRegister, action.payload);

        yield put(setAuthLoading(false));

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
            console.error(data.error);
            yield put(setAuthStatus(false));
            yield put(setRegisterError(data.error));
        }
    } catch(error) {
        console.log(error);
        yield put(setAuthLoading(false));
        yield put(setAuthStatus(false));

        throw new Error('Нет соединения с сервером!');
    }
}
