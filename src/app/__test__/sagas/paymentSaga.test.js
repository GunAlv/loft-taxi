import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { baseAPI } from '../../common/constants/baseAPI';
import { recordSaga } from '../../common/helpers/recordSaga';

import { paymentSuccessInfoDisableSaga, pushPaymentSaga } from '../../module/sagas/paymentSaga';
import {
    paymentSuccessInfoDisable,
    pushPayment,
    removePaymentSuccessInfo,
    setPaymentData,
    setPaymentStatus
} from '../../module/actions/payment';

const mock = new MockAdapter(axios);

describe('paymentSaga', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Успешная отправка данных на сервер', async() => {
        const payload = {
            cardName: 'test',
            cardNumber: '333',
            cvc: '111',
            expiryDate: '12/25',
        };

        const response = {
            success: true,
        };

        mock.onPost(`${baseAPI}card`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, response]);
            });
        });

        const dispatched = await recordSaga(
            pushPaymentSaga,
            pushPayment(payload.cardNumber, payload.expiryDate, payload.cardName, payload.cvc, 'someToken'),
        );

        expect(dispatched).toEqual([
            setPaymentStatus(true),
            setPaymentData(payload),
        ]);
    });

    it('Неуспешная отправка данных на сервер', async() => {
        const payload = {
            cardName: 'test',
            cardNumber: '333',
            cvc: '111',
            expiryDate: '12/25',
        };

        const response = {
            success: false,
        };

        mock.onPost(`${baseAPI}card`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, response]);
            });
        });

        const dispatched = await recordSaga(
            pushPaymentSaga,
            pushPayment(payload.cardNumber, payload.expiryDate, payload.cardName, payload.cvc, 'someToken'),
        );

        expect(dispatched).toEqual([
            setPaymentStatus(false),
        ]);
    });

    it('Удаление сообщения об успешной отправке', async() => {
        const dispatched = await recordSaga(
            paymentSuccessInfoDisableSaga,
            paymentSuccessInfoDisable(),
        );

        expect(dispatched).toEqual([
            removePaymentSuccessInfo(),
        ]);
    });
});
