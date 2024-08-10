import { createSlice } from '@reduxjs/toolkit';
import * as Types from './Types';

const initialState: Types.LoginState = {
    isLoading: false,
    isLoadingBlock: false,
    payload: {
        username: '',
        password: '',
    },
    dataLogin: [],
};
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        reqGetDataLogin: (state, action: Types.ActionReqGetDataLogin) => {
            state.isLoading = true;
            state.isLoadingBlock = false;
        },
        resGetDataLogin: (state, action: Types.ActionResGetDataLogin) => {
            const { dataLogin } = action.payload;
            state.isLoading = false;
            state.dataLogin = dataLogin;
            console.log(state.dataLogin);
        },
        reqLogin: (state, action) => {
            state.isLoading = true;
            state.isLoadingBlock = false;
            // console.log(action);
            // {userName: "dsds", password: "dsdsd"}
        },
        resLogin: (state, action) => {
            const { data } = action.payload;
            state.isLoading = false;
            state.dataLogin = data;
        },
    },
});

export const loginAction = loginSlice.actions;
export default loginSlice.reducer;
