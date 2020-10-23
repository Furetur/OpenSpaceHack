import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {requestLogin} from "./login.rest";

const selectLoginSlice = state => state.login

export const selectLoginStatus = createSelector(
    selectLoginSlice,
    loginState => loginState.status
)

export const tryLogin = createAsyncThunk('login/tryLogin', ({username, password}) => requestLogin(username, password))

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        status: null, // null | 'success' | 'error' | 'loading'
    },
    extraReducers: builder => {
        builder.addCase(tryLogin.pending, loginState => {
            loginState.status = 'loading'
        })
        builder.addCase(tryLogin.fulfilled, loginState => {
            loginState.status = 'success'
        })
        builder.addCase(tryLogin.rejected, loginState => {
            loginState.status = 'error'
        })
    }
})

export default loginSlice.reducer
