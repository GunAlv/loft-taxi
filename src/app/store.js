import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import applicationReducers from './module/reducers';
import rootSaga from './module/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    applicationReducers,
    compose(
        applyMiddleware(
            sagaMiddleware
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
    ),
);

sagaMiddleware.run(rootSaga);

export default store;
