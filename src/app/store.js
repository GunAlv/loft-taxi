import { createStore, applyMiddleware, compose } from 'redux';
import applicationReducers from './module/reducers';
import { authMiddleware } from './module/middlewares/authMiddleware';
import { registerMiddleware } from './module/middlewares/registerMiddleware';
import { paymentMiddleware } from './module/middlewares/paymentMiddleware';

const store = createStore(
    applicationReducers,
    compose(
        applyMiddleware(
            registerMiddleware,
            authMiddleware,
            paymentMiddleware,
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
    ),
);

export default store;
