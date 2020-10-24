import { createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {tryLogin} from "../login/login.slice";
import {fetchMe, selectMyId} from "../me/me.slice";
import {fetchReports, fetchSingleReport} from "../reports/reports.slice";

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
        builder.addCase(fetchSingleReport.fulfilled, (usersState, action) => {
            const user = action.payload.author
            usersAdapter.upsertOne(usersState, user)
        })
        builder.addCase(fetchReports.fulfilled, (usersState, action) => {
            const users = action.payload.map(report => report.author)
            usersAdapter.upsertMany(usersState, users)
        })
    }
})

export default usersSlice.reducer
