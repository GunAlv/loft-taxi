import paymentReducer from '../../module/reducers/payment-reducer';
import { getFromPaymentStorage } from '../../common/utils/paymentStorage';
import {
    GET_PAYMENT_DATA,
    GET_PAYMENT_STATUS,
    PAYMENT_SUCCESS_INFO_DISABLE,
    REMOVE_PAYMENT_SUCCESS_INFO
} from '../../common/constants/action-types';

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

describe('Payment Reducer', () => {
    it('Should return the initial state', () => {
        expect(
            paymentReducer(undefined, {}))
            .toEqual({
                ...initialState
            })
    });

    it('Should handle GET_PAYMENT_STATUS', () => {
        expect(
            paymentReducer(undefined, {
                type: GET_PAYMENT_STATUS,
                payload: true,
            }))
            .toEqual({
                ...initialState,
                isFetched: true,
                showSuccessInfo: true,
            })

        expect(
            paymentReducer(undefined, {
                type: GET_PAYMENT_STATUS,
                payload: false,
            }))
            .toEqual({
                ...initialState,
                isFetched: false,
                showSuccessInfo: false,
            })
    });

    it('Should handle REMOVE_PAYMENT_SUCCESS_INFO', () => {
        expect(
            paymentReducer(undefined, {
                type: REMOVE_PAYMENT_SUCCESS_INFO,
            }))
            .toEqual({
                ...initialState,
                showSuccessInfo: false,
            })
    });

    it('Should handle GET_PAYMENT_DATA', () => {
        expect(
            paymentReducer(undefined, {
                type: GET_PAYMENT_DATA,
                payload: {
                    cardNumber: '333',
                    expiryDate: '12/23',
                    cardName: 'test',
                    cvc: '111',
                }
            }))
            .toEqual({
                ...initialState,
                card: {
                    cardNumber: '333',
                    cardName: 'test',
                    expiryDate: '12/23',
                    cvc: '111',
                },
            })
    });

    it('Should handle PAYMENT_SUCCESS_INFO_DISABLE', () => {
        expect(
            paymentReducer(undefined, {
                type: PAYMENT_SUCCESS_INFO_DISABLE,
            }))
            .toEqual({
                ...initialState,
                showSuccessInfo: false,
            })
    });
});
