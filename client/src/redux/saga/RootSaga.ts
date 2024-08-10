import { all, fork } from 'redux-saga/effects';
import * as loginSaga from '../saga/login/LoginSaga';

/**
 * Root saga
 * @return {void}
 */
export default function* rootSaga() {
    yield all([fork(loginSaga.watchGetDataLogin)]);
}
