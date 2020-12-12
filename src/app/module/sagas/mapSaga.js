import axios from 'axios';
import { baseAPI } from '../../common/constants/baseAPI';
import { call, put } from 'redux-saga/effects';
import { setAddressList, setAddressProgress, setRouteCoords } from '../actions/map';

function fetchAddressList() {
    return axios({
        method: 'GET',
        url: `${baseAPI}addressList`,
    })
}

function fetchRoute({ addressFrom, addressTo }) {
    return axios({
        method: 'GET',
        url: `${baseAPI}route`,
        params: {
            address1: addressFrom,
            address2: addressTo,
        },
    })
}

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
