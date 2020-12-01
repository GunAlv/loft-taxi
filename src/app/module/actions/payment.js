import {
    GET_PAYMENT,
    GET_PAYMENT_DATA,
    GET_PAYMENT_STATUS,
    PAYMENT_SUCCESS_INFO_DISABLE,
    PUSH_PAYMENT,
    REMOVE_PAYMENT_SUCCESS_INFO
} from '../../common/constants/action-types';

export const pushPayment = (cardNumber, expiryDate, cardName, cvc, token) => ({
    type: PUSH_PAYMENT,
    payload: {
        cardNumber,
        expiryDate,
        cardName,
        cvc,
        token,
    },
});

export const getPaymentStatus = (isFetched) => ({
    type: GET_PAYMENT_STATUS,
    payload: isFetched,
});

export const paymentSuccessInfoDisable = () => ({
    type: PAYMENT_SUCCESS_INFO_DISABLE,
});

export const removePaymentSuccessInfo = () => ({
    type: REMOVE_PAYMENT_SUCCESS_INFO,
});

export const getPayment = (token) => ({
    type: GET_PAYMENT,
    payload: token,
});

export const getPaymentData = ({ cardNumber, expiryDate, cardName, cvc }) => ({
    type: GET_PAYMENT_DATA,
    payload: {
        cardNumber,
        expiryDate,
        cardName,
        cvc,
    },
});
