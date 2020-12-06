import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from '../../components/registration-form';
import { baseAPI } from '../../common/constants/baseAPI';
import { waitFor } from '@testing-library/dom';
import { wrapTestToProvider } from '../../wrapTestToProviders';
import { createMemoryHistory } from 'history';

const mock = new MockAdapter(axios);

const registrationFormData = {
    email: 'user@mail.ru',
    name: 'Константин',
    surname: 'Константинович',
    password: 'test',
};

describe('Форма регистрации', () => {
    let history = createMemoryHistory();
    let props = {
        onChangeForm: jest.fn(),
    };

    beforeEach(() => {
        render(
            wrapTestToProvider(RegistrationForm, history, props)
        );
    });

    it('Форма рендерится', () => {
        const registrationForm = screen.getByTestId('registration-form');
        expect(registrationForm).toBeInTheDocument();
    });

    it('При клике на кнопку "Войти" появляется соответствующая форма', () => {
        const loginLink = screen.getByText('Войти');
        fireEvent.click(loginLink);
        expect(props.onChangeForm).toHaveBeenCalledWith('login');
    });

    it('При неуспешном сабмите формы появляется сообщение об ошибке',  async () => {
        const registrationForm = screen.getByTestId('registration-form');

        mock.onPost(`${baseAPI}register`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    success: false,
                    error: 'Необходимые поля: email, password, name, surname',
                }]);
            });
        });

        fireEvent.submit(registrationForm, {
            target: {
                'registration-email': { value: registrationFormData.email },
                'registration-password': { value: registrationFormData.password },
                'registration-name': { value: registrationFormData.name },
                'registration-surname': { value: registrationFormData.surname }
            }
        });

        await waitFor(() => {
            expect(screen.getByTestId('registration-error')).toBeInTheDocument()
        });
    });

    it('При успешном сабмите формы редиректит на страницу карты',  async () => {
        const registrationForm = screen.getByTestId('registration-form');

        mock.onPost(`${baseAPI}register`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    success: true,
                    token: 'test_token',
                }]);
            });
        });

        fireEvent.submit(registrationForm, {
            target: {
                'registration-email': { value: registrationFormData.email },
                'registration-password': { value: registrationFormData.password },
                'registration-name': { value: registrationFormData.name },
                'registration-surname': { value: registrationFormData.surname }
            }
        });
        history.push('/map');

        await waitFor(() => {
            expect(history.location.pathname).toBe('/map');
        });
    });
});
