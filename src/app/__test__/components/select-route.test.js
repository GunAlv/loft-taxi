import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { wrapTestToProvider } from '../../wrapTestToProviders';
import RouteSelect from '../../components/route-select';
import { baseAPI } from '../../common/constants/baseAPI';

const mock = new MockAdapter(axios);

describe('Форма заказа такси', () => {
    let history = createMemoryHistory();
    let props = {};

    beforeEach(() => {
        const response = {
            status: 200,
            addresses: [
                'Пулково (LED)',
                'Эрмитаж',
                'Кинотеатр Аврора',
                'Мариинский театр',
            ],
        };

        mock.onGet(`${baseAPI}addressList`).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, response]);
            });
        });

        render(
            wrapTestToProvider(RouteSelect, history, props)
        );
    });

    it('Есть форма вызова такси', () => {
       const RouteSelect = screen.getByTestId('route-select');
       expect(RouteSelect).toBeInTheDocument();
    });

    it('Кнопка сабмита заблокирована до выбора маршрута от/куда', () => {
        const submitBtn = screen.getByTestId('route-select-button');
        expect(submitBtn).toBeDisabled();
    });

    it('Выбора маршрута в одном селекте блокирует его в другом', () => {
        fireEvent.change(screen.getByTestId("select-from"), {
            target: { value: 'Эрмитаж' },
        });
        const optionsTo = screen.getAllByTestId('select-option-to');
        expect(optionsTo[1]).toBeDisabled();
    });

    it('Кнопка сабмита разблокируется после выбора маршрутов от/куда', () => {
        const submitBtn = screen.getByTestId('route-select-button');
        fireEvent.change(screen.getByTestId("select-from"), {
            target: { value: 'Эрмитаж' },
        });
        fireEvent.change(screen.getByTestId("select-to"), {
            target: { value: 'Кинотеатр Аврора' },
        });
        expect(submitBtn).not.toBeDisabled();
    });
})