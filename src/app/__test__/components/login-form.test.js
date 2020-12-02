import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent } from '@testing-library/react';
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

    beforeEach(() => {
        render(
            wrapTestToProvider(LoginForm, history, props)
        );
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

        mock.onPost(`${baseAPI}auth`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    success: false,
                    error: 'Ошибка авторизации',
                }]);
            });
        });

        fireEvent.submit(loginForm, {
            target: {
                'login-email': { value: loginFormData.email },
                'login-password': { value: loginFormData.password }
            }
        });

        await waitFor(() => {
            expect(screen.getByTestId('login-error')).toBeInTheDocument()
        });
    });
});
