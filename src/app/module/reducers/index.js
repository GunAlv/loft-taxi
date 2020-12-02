import { combineReducers } from 'redux';

import registerReducer from './register-reducer';
import authReducer from './auth-reducer';
import paymentReducer from './payment-reducer';

export default combineReducers({
    registerReducer,
    authReducer,
    paymentReducer,
});
