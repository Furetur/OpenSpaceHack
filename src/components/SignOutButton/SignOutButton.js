import React, {useCallback} from 'react'
import {useDispatch} from "react-redux";
import {signOut} from "../../features/login/login.slice";

const SignOutButton = () => {
    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(signOut())
    }, [dispatch])

    return (
        <button onClick={onClick}>Sign out</button>
    )
}

export default SignOutButton