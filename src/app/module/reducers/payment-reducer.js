import {
    GET_PAYMENT_DATA,
    GET_PAYMENT_STATUS,
    REMOVE_PAYMENT_SUCCESS_INFO
} from '../../common/constants/action-types';

const initialState = {
    card: {
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvc: '',
    },
    isFetched: false,
    showSuccessInfo: false,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENT_STATUS:
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

        case GET_PAYMENT_DATA:
            return {
                ...state,
                card: action.payload,
                isFetched: true,
            }

        default:
            return state;
    }
};

export default paymentReducer;
