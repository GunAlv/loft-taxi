import { fetchAddressList, fetchRoute } from '../API';
import { call, put } from 'redux-saga/effects';
import { setAddressList, setAddressProgress, setRouteCoords } from '../actions/map';

export function* setAddressSaga(action) {
    try {
        yield put(setAddressProgress(true));
        const { data, status } = yield call(fetchAddressList);

        if (status === 200) {
            yield put(setAddressProgress(false));
            yield put(setAddressList(data.addresses));
        } else {
            console.error('Ошибка');
            yield put(setAddressProgress(false));
        }
    } catch(error) {
        console.error(error);
        yield put(setAddressProgress(false));

        throw new Error('Нет соединения с сервером!');
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
