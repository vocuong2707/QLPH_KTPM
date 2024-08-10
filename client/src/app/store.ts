import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../redux/saga/RootSaga';
import loginReducer from '../redux/reducer/login/LoginReducer';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        loginReducer,
    },
    middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
