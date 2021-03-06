import { fetchPayment } from '../API';
import { call, put } from 'redux-saga/effects';
import { removePaymentSuccessInfo, setPaymentData, setPaymentStatus } from '../actions/payment';
import { setPaymentStorage } from '../../common/utils/paymentStorage';

export function* pushPaymentSaga(action) {
    try {
        const { data } = yield call(fetchPayment, action.payload);

        if (data.success) {
            yield put(setPaymentStatus(true));
            yield put(setPaymentData(action.payload));
            yield setPaymentStorage({
                ...action.payload,
                isFilled: true,
            });
        } else {
            throw new Error();
        }
    } catch(error) {
        console.error(error);
        yield put(setPaymentStatus(false));
    }
}

export function* paymentSuccessInfoDisableSaga() {
    yield put(removePaymentSuccessInfo());
}
