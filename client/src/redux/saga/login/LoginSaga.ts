import { call, put, takeLatest } from 'redux-saga/effects';
import { commonAction } from '../../reducer/common/CommonReducer';
import { loginAction } from '../../reducer/login/LoginReducer';
import * as loginService from '../../../services/login/LoginService';
import * as TypesAction from '../../reducer/login/Types';
import * as TypesFetch from '../../../services/login/Types';

/**
 * Get data login
 * @param {object} action
 * @return {void}
 */
interface Payload {
    username: string;
    password: string;
}
// eslint-disable-next-line require-jsdoc
function* getDataLogin(action: TypesAction.ActionReqGetDataLogin) {
    try {
        const { username, password } = action.payload as Payload;

        const response: TypesFetch.ResFetchGetDataLogin = yield call(
            loginService.fetchGetDataLogin,
            username,
            password,
        );
        3;
        const dataLogin = response.dataLogin?.data;

        yield put(loginAction.resGetDataLogin({ dataLogin }));
        console.log('put success');
    } catch (error) {
        yield put(commonAction.displayError({ errorMsg: (error as Error).message }));
    }
}
/**
 * Watch get data login
 * @return {void}
 */
export function* watchGetDataLogin() {
    yield takeLatest(loginAction.reqGetDataLogin.type, getDataLogin);
}

/**
 *
 * @param {event} action
 */
function getLogin(action: any) {
    console.log(action);
    // {userName: "dsds", password: "dsdsd"}
}

/**
 *
 */
export function* watchGetLogin() {
    yield takeLatest(loginAction.reqLogin.type, getLogin);
}
