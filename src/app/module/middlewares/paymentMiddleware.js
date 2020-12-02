import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import {
    PAYMENT_SUCCESS_INFO_DISABLE,
    PUSH_PAYMENT,
} from '../../common/constants/action-types';
import { getPaymentData, getPaymentStatus, removePaymentSuccessInfo } from '../actions/payment';
import { setPaymentStorage } from '../../common/utils/paymentStorage';

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
                store.dispatch(getPaymentData(action.payload));
                setPaymentStorage(action.payload);
            })
            .catch(error => {
                console.log(error);
                store.dispatch(getPaymentStatus(false));
            })

    }

    if (action.type === PAYMENT_SUCCESS_INFO_DISABLE) {
        store.dispatch(removePaymentSuccessInfo());
    }

    return next(action);
};
