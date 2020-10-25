import React, { useCallback, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import styles from './AuthPage.module.css'
import { useHistory, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthorized, setIsAuthorized } from '../../login.slice'

const AuthPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const isAuthorized = useSelector(selectIsAuthorized)

    const { from } = location.state || { from: { pathname: '/reports' } }

    const onSuccess = useCallback(() => {
        dispatch(setIsAuthorized(true))
        history.replace(from)
    }, [dispatch, from, history])

    useEffect(() => {
        if (isAuthorized) {
            history.replace(from)
        }
    }, [from, history, isAuthorized])

    return (
        <div className={styles.AuthPage}>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signUp">Sign Up</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/login">
                    <Login onSuccess={onSuccess} />
                </Route>
                <Route path="/signUp">
                    <SignUp onSuccess={onSuccess} />
                </Route>
            </Switch>
        </div>
    )
}

export default AuthPage
