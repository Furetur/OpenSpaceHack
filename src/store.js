import {configureStore} from "@reduxjs/toolkit";
import loginReducer from './features/login/login.slice'
import usersReducer from './features/users/users.slice'
import meReducer from './features/me/me.slice'

const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
        me: meReducer,
    }
})

export default store
