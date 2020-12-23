import axios from 'axios';
import { baseAPI } from '../common/constants/baseAPI';

export function fetchAuth(data) {
    return axios({
        method: 'POST',
        url: `${baseAPI}auth`,
        data,
    });
}

export function fetchAddressList() {
    return axios({
        method: 'GET',
        url: `${baseAPI}addressList`,
    })
}

export function fetchRoute({ addressFrom, addressTo }) {
    return axios({
        method: 'GET',
        url: `${baseAPI}route`,
        params: {
            address1: addressFrom,
            address2: addressTo,
        },
    })
}

export function fetchPayment(data) {
    return axios({
        method: 'POST',
        url: `${baseAPI}card`,
        data,
    })
}

export function fetchRegister(data) {
    return axios({
        method: 'POST',
        url: `${baseAPI}register`,
        data,
    })
}
