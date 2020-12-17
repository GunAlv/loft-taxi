import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { baseAPI } from '../../common/constants/baseAPI';
import { recordSaga } from '../../common/helpers/recordSaga';
import { setAddressSaga, setRouteSaga } from '../../module/sagas/mapSaga';

import { setAddress, setAddressList, setAddressLoading, setRoute, setRouteCoords } from '../../module/actions/map';

const mock = new MockAdapter(axios);

describe('mapSaga', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Получение списка адресов', async() => {
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

        const dispatched = await recordSaga(
            setAddressSaga,
            setAddress(),
        );

        expect(dispatched).toEqual([
            setAddressLoading(true),
            setAddressList(response.addresses),
            setAddressLoading(false),
        ]);
    });

    it('Получение маршрута', async() => {
        const response = {
            status: 200,
            data: [
                [
                    30.316273,
                    59.940578,
                ]
            ],
        };

        mock.onGet(`${baseAPI}route`, {
            params: {
                address1: 'Откуда',
                address2: 'Куда'
            }
        }).reply(function (config) {
            return new Promise(function (resolve) {
                resolve([200, response]);
            });
        });

        const dispatched = await recordSaga(
            setRouteSaga,
            setRoute('Откуда', 'Куда'),
        );

        expect(dispatched).toEqual([
            setRouteCoords(response),
        ]);
    });
});
