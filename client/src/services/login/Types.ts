import type { Response } from '../../config/Constants';
import { LoginState } from '../../redux/reducer/login/Types';

export type ResFetchGetDataLogin = Response<{
    dataLogin: LoginState['dataLogin'];
}>;
