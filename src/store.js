import {configureStore} from "@reduxjs/toolkit";
import loginReducer from './features/login/login.slice'

const store = configureStore({
    reducer: {
        login: loginReducer
    }
})

export default store
