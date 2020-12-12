import {
    SET_ADDRESS,
    SET_ADDRESS_LIST,
    SET_ADDRESS_PROGRESS,
    SET_ROUTE,
    SET_ROUTE_COORDS
} from '../../common/constants/action-types';

export const setAddress = () => ({
    type: SET_ADDRESS,
});

export const setAddressList = (addressList) => ({
    type: SET_ADDRESS_LIST,
    payload: addressList,
});

export const setAddressProgress = (isProgress) => ({
    type: SET_ADDRESS_PROGRESS,
    payload: isProgress,
});

export const setRoute = (addressFrom, addressTo) => ({
    type: SET_ROUTE,
    payload: {
        addressFrom,
        addressTo,
    },
});

export const setRouteCoords = (routeCoords) => ({
    type: SET_ROUTE_COORDS,
    payload: routeCoords,
});
