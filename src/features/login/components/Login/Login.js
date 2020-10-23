import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectLoginStatus, tryLogin} from "../../login.slice";

const Login = () => {
    const dispatch = useDispatch()

    const status = useSelector(selectLoginStatus)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onSubmit = useCallback(() => {
        dispatch(tryLogin({username, password}))
    }, [dispatch, password, username])

    const onUsernameChange = useCallback((event) => setUsername(event.target.value), [])
    const onPasswordChange = useCallback((event) => setPassword(event.target.value), [])

    console.log('status', status)

    return (
        <div>
            <input type="text" onChange={onUsernameChange}/>
            <input type="text" onChange={onPasswordChange}/>
            <button onClick={onSubmit}>Login</button>
            {status === 'loading' && <span>loading</span>}
            {status === 'error' && <span>failed</span>}
            {status === 'success' && <span>success</span>}
        </div>
    )
}

export default Login