import { SET_ADDRESS_LIST, SET_ADDRESS_PROGRESS, SET_ROUTE_COORDS } from '../../common/constants/action-types';

const initialState = {
    addressList: [],
    routeCoords: [],
    isFetched: false,
    isProgress: false,
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS_LIST:
            return {
                ...state,
                addressList: action.payload,
                isFetched: true,
            }
        case SET_ROUTE_COORDS:
            return {
                ...state,
                routeCoords: action.payload,
            };
        case SET_ADDRESS_PROGRESS:
            return {
              ...state,
              isProgress: action.payload,
            };
        default:
            return state;
    }
};

export default mapReducer;
