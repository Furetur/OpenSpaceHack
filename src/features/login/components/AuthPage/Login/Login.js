import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsAuthorized } from '../../../login.slice'
import { HOST } from '../../../../../constants'
import { saveAuthToken } from '../../../login.utils'
import { receiveUser } from '../../../../users/users.slice'

const Login = ({ onSuccess = () => {} }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onSubmit = useCallback(async () => {
        const response = await fetch(`${HOST}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
        })
        const authHeader = response.headers.get('Authorization')
        if (authHeader != null) {
            const authToken = authHeader.slice(7)
            saveAuthToken(authToken)
            const user = await response.json()
            dispatch(receiveUser(user))
            dispatch(setIsAuthorized(true))
            onSuccess()
        }
    }, [dispatch, onSuccess, password, username])

    const onUsernameChange = useCallback(
        (event) => setUsername(event.target.value),
        []
    )
    const onPasswordChange = useCallback(
        (event) => setPassword(event.target.value),
        []
    )

    return (
        <div>
            <input type="text" onChange={onUsernameChange} />
            <input type="text" onChange={onPasswordChange} />
            <button onClick={onSubmit}>Login</button>
        </div>
    )
}

export default Login
