import { createStore, applyMiddleware, compose } from 'redux';
import applicationReducers from './module/reducers';
import { authMiddleware } from './module/middlewares/authMiddleware';
import { registerMiddleware } from './module/middlewares/registerMiddleware';

const store = createStore(
    applicationReducers,
    compose(
        applyMiddleware(
            registerMiddleware,
            authMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
    ),
);

export default store;
