import { fetchAddressList, fetchRoute } from '../API';
import { call, put } from 'redux-saga/effects';
import { setAddressList, setAddressLoading, setRouteCoords } from '../actions/map';

export function* setAddressSaga(action) {
    try {
        yield put(setAddressLoading(true));
        const { data, status } = yield call(fetchAddressList);

        if (status === 200) {
            yield put(setAddressList(data.addresses));
        } else {
            console.error('Ошибка');
        }
    } catch(error) {
        console.error(error);

        throw new Error('Нет соединения с сервером!');
    } finally {
        yield put(setAddressLoading(false));
    }
}

export function* setRouteSaga(action) {
    try {
        const { data, status } = yield call(fetchRoute, action.payload);

        if (status === 200) {
            yield put(setRouteCoords(data));
        } else {
            console.error('Ошибка');
        }
    } catch(error) {
        console.error(error);
    }
}
