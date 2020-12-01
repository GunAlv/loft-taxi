import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import {
    GET_PAYMENT,
    PAYMENT_SUCCESS_INFO_DISABLE,
    PUSH_PAYMENT,
} from '../../common/constants/action-types';
import { getPaymentData, getPaymentStatus, removePaymentSuccessInfo } from '../actions/payment';

export const paymentMiddleware = store => next => action => {
    if (action.type === PUSH_PAYMENT) {
        axios.post(`${baseAPI}card`, action.payload)
            .then(response => {
                const { data } = response;

                if (!data.success) {
                    store.dispatch(getPaymentStatus(false));

                    return;
                }

                store.dispatch(getPaymentStatus(true));
            })
            .catch(error => {
                console.log(error);
                store.dispatch(getPaymentStatus(false));
            })

    }

    if (action.type === PAYMENT_SUCCESS_INFO_DISABLE) {
        store.dispatch(removePaymentSuccessInfo());
    }

    if (action.type === GET_PAYMENT) {
        axios.get(`${baseAPI}card?token=${action.payload}`)
            .then(response => {
                const { status, data } = response;

                // при успешной отправки формы не возвращается data.sucсess,
                // однако при неудаче эта данная есть и равна false.

                if (status === 200) {
                    if ((typeof data.success === 'boolean') && ((!data.success))) return;

                    store.dispatch(getPaymentData(data));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return next(action);
};
