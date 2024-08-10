import { PayloadAction } from '@reduxjs/toolkit';

export type LoginState = {
    isLoading: boolean;
    isLoadingBlock: boolean;
    payload: {
        username: string;
        password: string;
    };
    dataLogin: [];
};

export type ActionReqGetDataLogin = PayloadAction<{}>;

export type ActionResGetDataLogin = PayloadAction<{
    dataLogin: LoginState['dataLogin'];
}>;
