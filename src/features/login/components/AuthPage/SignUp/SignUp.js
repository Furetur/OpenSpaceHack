import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useInputValue from '../../../../../utils/useInputValue'
import { HOST } from '../../../../../constants'
import { saveAuthToken } from '../../../login.utils'
import { receiveUser } from '../../../../users/users.slice'
import { setIsAuthorized } from '../../../login.slice'

const SignUp = ({ onSuccess = () => {} }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useInputValue()
    const [password, setPassword] = useInputValue()
    const [firstName, setFirstName] = useInputValue()
    const [secondName, setSecondName] = useInputValue()
    const [lastName, setLastName] = useInputValue()
    const [petName, setPetName] = useInputValue()

    const onSubmit = useCallback(async () => {
        const response = await fetch(`${HOST}/signup`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                first_name: firstName,
                second_name: secondName,
                last_name: lastName,
                pet_name: petName,
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
    }, [
        dispatch,
        firstName,
        lastName,
        onSuccess,
        password,
        petName,
        secondName,
        username,
    ])

    return (
        <div>
            <label>
                username
                <input type="text" onChange={setUsername} />
            </label>
            <label>
                password
                <input type="text" onChange={setPassword} />
            </label>
            <label>
                first name
                <input type="text" onChange={setFirstName} />
            </label>
            <label>
                secondName
                <input type="text" onChange={setSecondName} />
            </label>
            <label>
                lastName
                <input type="text" onChange={setLastName} />
            </label>
            <label>
                petName
                <input type="text" onChange={setPetName} />
            </label>
            <button onClick={onSubmit}>Sign Up</button>
        </div>
    )
}

export default SignUp
