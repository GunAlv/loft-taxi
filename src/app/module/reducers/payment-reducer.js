import {
    SET_PAYMENT_DATA,
    SET_PAYMENT_STATUS,
    REMOVE_PAYMENT_SUCCESS_INFO
} from '../../common/constants/action-types';
import { getFromPaymentStorage } from '../../common/utils/paymentStorage';

const initialState = {
    card: {
        cardNumber: getFromPaymentStorage('cardNumber') || '',
        cardName: getFromPaymentStorage('cardName') || '',
        expiryDate: getFromPaymentStorage('expiryDate') || '',
        cvc: getFromPaymentStorage('cvc') || '',
    },
    isFetched: false,
    showSuccessInfo: false,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYMENT_STATUS:
            return {
                ...state,
                isFetched: action.payload,
                showSuccessInfo: action.payload,
            };

        case REMOVE_PAYMENT_SUCCESS_INFO:
            return {
                ...state,
                showSuccessInfo: false,
            };

        case SET_PAYMENT_DATA:
            return {
                ...state,
                card: action.payload,
            }

        default:
            return state;
    }
};

export default paymentReducer;
