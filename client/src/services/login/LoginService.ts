import { ROOT_URL, CONTENT_TYPE, COMMON } from '../../config/ApiConstants';
import * as Types from '../../services/login/Types';

export const fetchGetDataLogin = async (username: string, password: string): Promise<Types.ResFetchGetDataLogin> => {
    const url = ROOT_URL + COMMON.API_LOGIN.URL;
    const response = await fetch(url, {
        method: COMMON.API_LOGIN.METHOD,
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Content-Type': CONTENT_TYPE,
        },
    });
    const data = await response.json();
    return data;
};
