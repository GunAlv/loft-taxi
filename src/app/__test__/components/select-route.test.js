import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { wrapTestToProvider } from '../../wrapTestToProviders';
import RouteSelect from '../../components/route-select';
import { baseAPI } from '../../common/constants/baseAPI';

const mock = new MockAdapter(axios);

describe('Форма заказа такси', () => {
    let history = createMemoryHistory();
    let props = {};

    beforeEach(async () => {
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

        await act(async () => {
            render(wrapTestToProvider(RouteSelect, history, props));
        });
    });

    it('Есть форма вызова такси', () => {
       const routeSelect = screen.getByTestId('route-select');
       expect(routeSelect).toBeInTheDocument();
    });

    it('Кнопка сабмита заблокирована до выбора маршрута от/куда', () => {
        const submitBtn = screen.getByTestId('route-select-button');
        expect(submitBtn).toBeDisabled();
    });

    it('Выбора маршрута в одном селекте блокирует его в другом', async () => {
        await act(async () => {
            fireEvent.change(screen.getByTestId("select-from"), {
                target: { value: 'Эрмитаж' },
            });
        });
        const optionsTo = screen.getAllByTestId('select-option-to');
        expect(optionsTo[1]).toBeDisabled();
    });

    it('Кнопка сабмита разблокируется после выбора маршрутов от/куда', async () => {
        const submitBtn = screen.getByTestId('route-select-button');
        await act(async () => {
            fireEvent.change(screen.getByTestId("select-from"), {
                target: { value: 'Эрмитаж' },
            });
        });
        await act(async () => {
            fireEvent.change(screen.getByTestId("select-to"), {
                target: { value: 'Кинотеатр Аврора' },
            });
        });

        expect(submitBtn).not.toBeDisabled();
    });
});
