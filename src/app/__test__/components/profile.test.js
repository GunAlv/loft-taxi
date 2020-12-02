import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../../components/profile';
import { baseAPI } from '../../common/constants/baseAPI';
import { waitFor } from '@testing-library/dom';
import { wrapTestToProvider } from '../../wrapTestToProviders';
import { createMemoryHistory } from 'history';

const mock = new MockAdapter(axios);

describe('Профиль', () => {
    let history = createMemoryHistory();
    let card = {
        cardNumber: '3333333333333333',
        cardName: 'test',
        expiryDate: '12/22',
        cvc: '333',
    };
    let props = {};

    beforeEach(() => {
        render(
            wrapTestToProvider(Profile, history, props)
        );
    });

    it('Профиль рендерится', () => {
        const profile = screen.getByTestId('profile');
        expect(profile).toBeInTheDocument();
    });

    it('Изначально инпуты пусты', () => {
        const inputName = screen.getByLabelText('Имя владельца');
        expect(inputName.value).toBe('');

        const inputNumber = screen.getByLabelText('Номер карты');
        expect(inputNumber.value).toBe('');

        const inputExpiryDate = screen.getByLabelText('MM/YY');
        expect(inputExpiryDate.value).toBe('');

        const inputCVC = screen.getByLabelText('CVC');
        expect(inputCVC.value).toBe('');
    });

    it('При успешном сабмите формы появлется соответствующая информация',  async () => {
        const profileForm = screen.getByTestId('profile-form');

        mock.onPost(`${baseAPI}card`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, {
                    'success': true,
                }]);
            });
        });

        fireEvent.submit(profileForm, {
            target: {
                'payment-name': { value: card.cardName },
                'payment-number': { value: card.cardNumber },
                'payment-date': { value: card.expiryDate },
                'payment-cvc': { value: card.cvc },
            }
        });

        await waitFor(() => {
            const successInfo = screen.getByText('Платёжные данные обновлены. Теперь вы можете заказывать такси.');
            expect(successInfo).toBeInTheDocument();

            fireEvent.click(screen.getByText('Перейти на карту'));
            const baseStage = screen.getByText('Введите платежные данные');
            expect(baseStage).toBeInTheDocument();
        });
    });
});
