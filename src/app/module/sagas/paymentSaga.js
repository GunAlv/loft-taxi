import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { call, put } from 'redux-saga/effects';
import { removePaymentSuccessInfo, setPaymentData, setPaymentStatus } from '../actions/payment';
import { setPaymentStorage } from '../../common/utils/paymentStorage';

function fetchPayment(data) {
    return axios({
        method: 'POST',
        url: `${baseAPI}card`,
        data,
    })
}

export function* pushPaymentSaga(action) {
    try {
        const { data } = yield call(fetchPayment, action.payload);

        if (data.success) {
            yield put(setPaymentStatus(true));
            yield put(setPaymentData(action.payload));
            yield setPaymentStorage(action.payload);
        } else {
            console.error(data.error);
            yield put(setPaymentStatus(false));
        }
    } catch(error) {
        console.error(error);
        yield put(setPaymentStatus(false));

        throw new Error('Нет соединения с сервером!');
    }
}

export function* paymentSuccessInfoDisableSaga() {
    yield put(removePaymentSuccessInfo());
}
