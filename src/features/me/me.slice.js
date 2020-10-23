import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {tryLogin} from "../login/login.slice";
import {requestMe} from "./me.rest";

const selectMeSlice = state => state.me

export const selectMyId = createSelector(
    selectMeSlice,
    meState =>  meState.myId
)

export const fetchMe = createAsyncThunk('fetchMe', requestMe)

const meSlice = createSlice({
    name: 'me',
    initialState: {
        myId: undefined,
    },
    extraReducers: builder => {
        builder.addCase(fetchMe.fulfilled, (meState, action) => {
            meState.myId = action.payload.id
        })
        builder.addCase(tryLogin.fulfilled, (meState, action) => {
            meState.myId = action.payload.id
        })
    }
})

export default meSlice.reducer
