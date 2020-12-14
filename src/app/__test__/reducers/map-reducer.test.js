import mapReducer from '../../module/reducers/map-reducer';
import {
    SET_ADDRESS_LIST,
    SET_ROUTE_COORDS,
    SET_ADDRESS_PROGRESS,
} from '../../common/constants/action-types';

const initialState = {
    addressList: [],
    routeCoords: [],
    isFetched: false,
    isProgress: false,
};

describe('Map Reducer', () => {
    it('Should return the initial state', () => {
        expect(
            mapReducer(undefined, {}))
            .toEqual({
                ...initialState
            })
    });

    it('Should handle SET_ADDRESS_LIST', () => {
        expect(
            mapReducer(undefined, {
                type: SET_ADDRESS_LIST,
                payload: ['Some address'],
            }))
            .toEqual({
                ...initialState,
                addressList: ['Some address'],
                isFetched: true,
            })
    });

    it('Should handle SET_ROUTE_COORDS', () => {
        expect(
            mapReducer(undefined, {
                type: SET_ROUTE_COORDS,
                payload: [[15, 22]],
            }))
            .toEqual({
                ...initialState,
                routeCoords: [[15, 22]],
            })
    });

    it('Should handle SET_ADDRESS_PROGRESS', () => {
        expect(
            mapReducer(undefined, {
                type: SET_ADDRESS_PROGRESS,
                payload: true,
            }))
            .toEqual({
                ...initialState,
                isProgress: true,
            })

        expect(
            mapReducer(undefined, {
                type: SET_ADDRESS_PROGRESS,
                payload: false,
            }))
            .toEqual({
                ...initialState,
                isProgress: false,
            })
    });
});
