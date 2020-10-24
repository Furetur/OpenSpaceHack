import React from 'react'
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuthorized} from "../../features/login/login.slice";

const ProtectedRoute = ({children, ...rest}) => {
    const isAuthenticated = useSelector(selectIsAuthorized)

    return (
        <Route
            {...rest}
            render={({location}) => isAuthenticated ? children : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: location}
                }}/>
            )}
        />
    )
}

export default ProtectedRoute
