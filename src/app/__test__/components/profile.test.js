import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Profile from '../../components/profile';
import { baseAPI } from '../../common/constants/baseAPI';
import { waitFor } from '@testing-library/dom';
import { wrapTestToProvider } from '../../wrapTestToProviders';
import { createMemoryHistory } from 'history';

const mock = new MockAdapter(axios);

const card = {
    cardNumber: '3333333333333333',
    cardName: 'test',
    cvc: '333',
};

const fillForm = async () => {
    const profileForm = screen.getByTestId('profile-form');
    const profileFormName = screen.getByTestId('profile-form-name');
    const profileFormNumber = screen.getByTestId('profile-form-number');
    const profileFormDate = screen.getByTestId('profile-form-date');
    const profileFormCvc = screen.getByTestId('profile-form-cvc');

    await act(async () => {
        fireEvent.input(profileFormName, { target: { value: card.cardName } });
    });
    await act(async () => {
        fireEvent.input(profileFormNumber, { target: { value: card.cardNumber } });
    });
    await act(async () => {
        fireEvent.click(profileFormDate);

        await waitFor(() => {
            const month = screen.getByText('Jan');
            fireEvent.click(month);
            const year = screen.getByText('2022');
            fireEvent.click(year);
        });
    });
    await act(async () => {
        fireEvent.input(profileFormCvc, { target: { value: card.cvc } });
    });
    await act(async () => {
        fireEvent.submit(profileForm);
    });
};

describe('Профиль', () => {
    let history = createMemoryHistory();
    let props = {};

    beforeEach(async () => {
        await act(async () => {
            render(wrapTestToProvider(Profile, history, props));
        });
    });

    it('Профиль рендерится', () => {
        const profile = screen.getByTestId('profile');
        expect(profile).toBeInTheDocument();
    });

    it('При успешном сабмите формы появлется соответствующая информация',  async () => {
        mock.onPost(`${baseAPI}card`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    'success': true,
                }]);
            });
        });

        await fillForm();

        await waitFor(() => {
            const successInfo = screen.getByTestId('profile-update-message');
            expect(successInfo).toBeInTheDocument();
        });
    });
});
