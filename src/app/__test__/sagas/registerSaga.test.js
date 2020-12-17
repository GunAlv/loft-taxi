import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { baseAPI } from '../../common/constants/baseAPI';
import { recordSaga } from '../../common/helpers/recordSaga';

import { setPaymentData } from '../../module/actions/payment';
import { setRegister, setRegisterError } from '../../module/actions/register';
import { setRegisterSaga } from '../../module/sagas/registerSaga';
import { setAuthLoading, setAuthStatus } from '../../module/actions/auth';

const mock = new MockAdapter(axios);

const payload = {
    email: 'test@mail.ru',
    password: 'test',
    name: 'Константин',
    surname: 'Тестович',
};

describe('registerSaga', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Успешная регистрация', async() => {
        const emptyCard = {
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvc: '',
        };

        const response = {
            success: true,
            token: 'someToken',
        };

        mock.onPost(`${baseAPI}register`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, response]);
            });
        });

        const dispatched = await recordSaga(
            setRegisterSaga,
            setRegister(payload.email, payload.password, payload.name, payload.surname),
        );

        expect(dispatched).toEqual([
            setAuthLoading(true),
            setPaymentData(emptyCard),
            setRegisterError(''),
            setAuthStatus(true, response.token),
            setAuthLoading(false),
        ]);
    });

    it('Неуспешная регистрация', async() => {
        const response = {
            success: false,
            error: 'someError',
        };

        mock.onPost(`${baseAPI}register`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, response]);
            });
        });

        const dispatched = await recordSaga(
            setRegisterSaga,
            setRegister(payload.email, payload.password, payload.name, payload.surname),
        );

        expect(dispatched).toEqual([
            setAuthLoading(true),
            setAuthStatus(false),
            setRegisterError(response.error),
            setAuthLoading(false),
        ]);
    });
});
