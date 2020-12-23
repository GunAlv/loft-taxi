import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent, act } from '@testing-library/react';
import RegistrationForm from '../../components/registration-form';
import { baseAPI } from '../../common/constants/baseAPI';
import { waitFor } from '@testing-library/dom';
import { wrapTestToProvider } from '../../wrapTestToProviders';
import { createMemoryHistory } from 'history';

const mock = new MockAdapter(axios);

const registrationFormData = {
    email: 'user@mail.ru',
    name: 'John',
    surname: 'Dou',
    password: 'test',
};

const fillForm = () => {
    const registrationForm = screen.getByTestId('registration-form');
    const registrationFormEmail = screen.getByTestId('registration-form-email');
    const registrationFormName = screen.getByTestId('registration-form-name');
    const registrationFormSurname = screen.getByTestId('registration-form-surname');
    const registrationFormPassword = screen.getByTestId('registration-form-password');

    fireEvent.input(registrationFormEmail, { target: { value: registrationFormData.email } });
    fireEvent.input(registrationFormName, { target: { value: registrationFormData.name } });
    fireEvent.input(registrationFormSurname, { target: { value: registrationFormData.surname } });
    fireEvent.input(registrationFormPassword, { target: { value: registrationFormData.password } });

    fireEvent.submit(registrationForm);
};

describe('Форма регистрации', () => {
    let history = createMemoryHistory();
    let props = {
        onChangeForm: jest.fn(),
    };

    beforeEach(async () => {
        await act(async () => {
            render(wrapTestToProvider(RegistrationForm, history, props));
        });
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
        mock.onPost(`${baseAPI}register`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    success: false,
                    error: 'Необходимые поля: email, password, name, surname',
                }]);
            });
        });

        fillForm();

        await waitFor(() => {
            expect(screen.getByTestId('registration-error')).toBeInTheDocument()
        });
    });

    it('При успешном сабмите формы редиректит на страницу карты',  async () => {
        mock.onPost(`${baseAPI}register`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    success: true,
                    token: 'test_token',
                }]);
            });
        });

        fillForm();
        history.push('/map');

        await waitFor(() => {
            expect(history.location.pathname).toBe('/map');
        });
    });
});
