import React, {useCallback, useState} from 'react'
import {useDispatch} from "react-redux";
import {tryLogin} from "../../login.slice";

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onSubmit = useCallback(() => {
        dispatch(tryLogin({username, password}))
    }, [dispatch, password, username])

    const onUsernameChange = useCallback((event) => setUsername(event.target.value), [])
    const onPasswordChange = useCallback((event) => setPassword(event.target.value), [])

    return (
        <div>
            <input type="text" onChange={onUsernameChange}/>
            <input type="text" onChange={onPasswordChange}/>
            <button onClick={onSubmit}>Login</button>
        </div>
    )
}

export default Login