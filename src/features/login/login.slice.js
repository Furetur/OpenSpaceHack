import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {requestLogin} from "./login.rest";
import {requestMe} from "../me/me.rest";

const selectLoginSlice = state => state.login

export const selectIsAuthorized = createSelector(
    selectLoginSlice,
    loginState => loginState.authorized
)

export const tryLogin = createAsyncThunk('login/tryLogin', ({username, password}) => requestLogin(username, password))

export const checkAuth = createAsyncThunk('login/checkAuth', requestMe)

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        authorized: true,
    },
    reducers: {
        setIsAuthorized(loginState, action) {
            loginState.authorized = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(tryLogin.fulfilled, loginState => {
            loginState.authorized = true
        })
        builder.addCase(tryLogin.rejected, loginState => {
            loginState.authorized = false
        })
        builder.addCase(checkAuth.rejected, loginState => {
            loginState.authorized = false
        })
        builder.addCase(checkAuth.fulfilled, loginState => {
            loginState.authorized = true
        })
    }
})

export const setIsAuthorized = loginSlice.actions.setIsAuthorized

export default loginSlice.reducer
