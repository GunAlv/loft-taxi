import { takeEvery } from '@redux-saga/core/effects';
import {
    PAYMENT_SUCCESS_INFO_DISABLE,
    PUSH_PAYMENT,
    REMOVE_AUTH,
    SET_AUTH,
    SET_REGISTER
} from '../../common/constants/action-types';
import { removeAuthSaga, setAuthSaga } from './authSaga';
import { paymentSuccessInfoDisableSaga, pushPaymentSaga } from './paymentSaga';
import { setRegisterSaga } from './registerSaga';

function* rootSaga() {
    yield takeEvery(SET_AUTH, setAuthSaga);
    yield takeEvery(REMOVE_AUTH, removeAuthSaga);
    yield takeEvery(PUSH_PAYMENT, pushPaymentSaga);
    yield takeEvery(PAYMENT_SUCCESS_INFO_DISABLE, paymentSuccessInfoDisableSaga);
    yield takeEvery(SET_REGISTER, setRegisterSaga);
}

export default rootSaga;
