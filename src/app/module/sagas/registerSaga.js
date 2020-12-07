import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { call, put } from 'redux-saga/effects';
import { setAuthProgress, setAuthStatus } from '../actions/auth';
import { deletePaymentStorage } from '../../common/utils/paymentStorage';
import { setPaymentData } from '../actions/payment';
import { setAuthStorage } from '../../common/utils/authStorage';
import { setRegisterError } from '../actions/register';

function fetchRegister(data) {
    return axios({
        method: 'POST',
        url: `${baseAPI}register`,
        data,
    })
}

export function* setRegisterSaga(action) {
    try {
        const { data } = yield call(fetchRegister, action.payload);

        yield put(setAuthProgress(false));

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
        yield put(setAuthProgress(false));
        yield put(setAuthStatus(false));

        throw new Error('Нет соединения с сервером!');
    }
}
