import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {requestMe} from "./users.rest";
import {buyItem} from "../shop/shop.actions";
import {parseUserFromRest} from "./users.utils";
import {getShopItemPrice} from "../shop/shop.utils";

const selectUsersSlice = state => state.users

const usersAdapter = createEntityAdapter()

export const selectMyId = createSelector(
    selectUsersSlice,
    usersState => usersState.myId
)

export const fetchMe = createAsyncThunk('fetchMe', requestMe)

export const selectMe = createSelector(
    selectMyId,
    selectUsersSlice,
    (id, users) => id == null ? undefined : users.entities[id]
)

export const selectMyMoney = createSelector(
    selectMe,
    me => me?.money
)

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        myId: undefined,
    }),
    reducers: {
        receiveUser(usersState, action) {
            usersAdapter.upsertOne(usersState, action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMe.fulfilled, (usersState, action) => {
            const user = parseUserFromRest(action.payload)
            usersState.myId = user.id
            usersAdapter.upsertOne(usersState, user)
        })
        builder.addCase(buyItem.fulfilled, (usersState, action) => {
            const myId = usersState.myId

            if (myId != null && usersState.entities[myId] != null) {
                usersState.entities[myId].inventory = action.payload
                debugger
                usersState.entities[myId].money -= getShopItemPrice(action.meta.arg)
            }
        })
    }
})

export const receiveUser = usersSlice.actions.receiveUser

export default usersSlice.reducer
