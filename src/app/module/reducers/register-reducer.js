import { GET_REGISTER_ERROR } from '../../common/constants/action-types';

const initialState = {
    registerError: '',
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REGISTER_ERROR:
            return {
                ...state,
                registerError: action.payload,
            };

        default:
            return state;
    }
};

export default registerReducer;
