import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LoginForm from '../../components/login-form';
import { baseAPI } from '../../common/constants/baseAPI';
import { waitFor } from '@testing-library/dom';
import { wrapTestToProvider } from '../../wrapTestToProviders';
import { createMemoryHistory } from 'history';

const mock = new MockAdapter(axios);

const loginFormData = {
    email: 'user@mail.ru',
    password: 'test',
};

describe('Форма логина', () => {
    let history = createMemoryHistory();
    let props = {
        onChangeForm: jest.fn(),
    };

    beforeEach(async () => {
        await act(async () => {
           render(wrapTestToProvider(LoginForm, history, props));
        });
    });

    it('Форма рендерится', () => {
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toBeInTheDocument();
    });

    it('При клике на кнопку "Регистрация" появляется соответствующая форма', () => {
        const registrationLink = screen.getByText('Регистрация');
        fireEvent.click(registrationLink);
        expect(props.onChangeForm).toHaveBeenCalledWith('registration');
    });

    it('При неуспешном сабмите формы появляется сообщение об ошибке',  async () => {
        const loginForm = screen.getByTestId('login-form');
        const loginFormEmail = screen.getByTestId('login-form-email');
        const loginFormPassword = screen.getByTestId('login-form-password');

        mock.onPost(`${baseAPI}auth`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    success: false,
                    error: 'Ошибка авторизации',
                }]);
            });
        });

        fireEvent.input(loginFormEmail, {
            target: {
                value: loginFormData.email
            }
        });

        fireEvent.input(loginFormPassword, {
            target: {
                value: loginFormData.password
            }
        });

        fireEvent.submit(loginForm);

        await waitFor(() => {
            expect(screen.getByTestId('login-error')).toBeInTheDocument()
        });
    });

    it('При успешном сабмите формы редиректит на страницу карты',  async () => {
        const loginForm = screen.getByTestId('login-form');
        const loginFormEmail = screen.getByTestId('login-form-email');
        const loginFormPassword = screen.getByTestId('login-form-password');

        mock.onPost(`${baseAPI}auth`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    success: false,
                    token: 'test_token',
                }]);
            });
        });

        fireEvent.input(loginFormEmail, {
            target: {
                value: loginFormData.email
            }
        });

        fireEvent.input(loginFormPassword, {
            target: {
                value: loginFormData.password
            }
        });

        fireEvent.submit(loginForm);
        history.push('/map');

        await waitFor(() => {
            expect(history.location.pathname).toBe('/map');
        });
    });
});
