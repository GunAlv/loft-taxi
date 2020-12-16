import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { baseAPI } from '../../common/constants/baseAPI';
import { recordSaga } from '../../common/helpers/recordSaga';
import { removeAuthSaga, setAuthSaga } from '../../module/sagas/authSaga';

import { removeAuth, setAuth, setAuthError, setAuthLoading, setAuthStatus } from '../../module/actions/auth';
import { setRegisterError } from '../../module/actions/register';

const mock = new MockAdapter(axios);

const payload = {
    email: 'test@mail.ru',
    password: 'test',
};

describe('authSaga', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

   it('Успешная аутенфикация', async() => {
       const response = {
           success: true,
           token: 'someToken',
       };

       mock.onPost(`${baseAPI}auth`).reply(function (config) {
           return new Promise(function (resolve) {
               resolve([200, response]);
           });
       });

       const dispatched = await recordSaga(
           setAuthSaga,
           setAuth(payload.email, payload.password),
       );

       expect(dispatched).toEqual([
           setAuthLoading(true),
           setAuthLoading(false),
           setAuthStatus(true, response.token)
       ]);
   });

    it('Неуспешная аутенфикация', async() => {
        const response = {
            success: false,
            error: 'errorMessage',
        };

        mock.onPost(`${baseAPI}auth`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, response]);
            });
        });

        const dispatched = await recordSaga(
            setAuthSaga,
            setAuth(payload.email, payload.password),
        );

        expect(dispatched).toEqual([
            setAuthLoading(true),
            setAuthLoading(false),
            setAuthStatus(false),
            setAuthError(response.error),
        ]);
    });

    it('Удаление аутенфикации (разлогин)', async() => {
        const dispatched = await recordSaga(
            removeAuthSaga,
            removeAuth(),
        );

        expect(dispatched).toEqual([
            setAuthError(''),
            setRegisterError(''),
            setAuthStatus(false, undefined),
        ]);
    });
});
