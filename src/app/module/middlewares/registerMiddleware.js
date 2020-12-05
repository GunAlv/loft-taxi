import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { SET_REGISTER } from '../../common/constants/action-types';
import { setAuthProgress, setAuthStatus } from '../actions/auth';
import { setAuthStorage } from '../../common/utils/authStorage';
import { setRegisterError } from '../actions/register';
import { deletePaymentStorage } from '../../common/utils/paymentStorage';
import { setPaymentData } from '../actions/payment';

export const registerMiddleware = store => next => action => {
    if (action.type === SET_REGISTER) {
        store.dispatch(setAuthProgress(true));

        axios.post(`${baseAPI}register`, action.payload)
            .then(response => {
                const { data } = response;
                store.dispatch(setAuthProgress(false));

                if (!data.success) {
                    store.dispatch(setAuthStatus(false));
                    store.dispatch(setRegisterError(data.error));

                    return;
                }

                deletePaymentStorage();
                store.dispatch(setPaymentData({
                    cardNumber: '',
                    cardName: '',
                    expiryDate: '',
                    cvc: '',
                }));
                setAuthStorage(true, data.token);
                store.dispatch(setRegisterError(''));
                store.dispatch(setAuthStatus(true, data.token));
            })
            .catch(error => {
                console.log(error);
                store.dispatch(setAuthProgress(false));
                store.dispatch(setAuthStatus(false));
            })
    }

    return next(action);
};
