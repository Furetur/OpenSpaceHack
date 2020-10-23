import { createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {tryLogin} from "../login/login.slice";
import {fetchMe, selectMyId} from "../me/me.slice";

const selectUsersSlice = state => state.users

const usersAdapter = createEntityAdapter()

export const selectMe = createSelector(
    selectMyId,
    selectUsersSlice,
    (id, users) => id == null ? undefined : users.entities[id]
)

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(),
    extraReducers: builder => {
        builder.addCase(fetchMe.fulfilled, (usersState, action) => {
            usersAdapter.upsertOne(usersState, action.payload)
        })
        builder.addCase(tryLogin.fulfilled, (usersState, action) => {
            usersAdapter.upsertOne(usersState, action.payload)
        })
    }
})

export default usersSlice.reducer
