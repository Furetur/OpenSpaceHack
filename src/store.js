import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/login/login.slice'
import usersReducer from './features/users/users.slice'
import reportsReducer from './features/reports/reports.slice'

const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
        reports: reportsReducer,
    },
})

export default store
