import { combineReducers } from 'redux';

import authReducer from './auth-reducer';
import paymentReducer from './payment-reducer';

export default combineReducers({
    authReducer,
    paymentReducer,
});
