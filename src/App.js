import React, { useEffect } from 'react'
import './App.css'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkAuth } from './features/login/login.slice'
import Header from './components/Header/Header'
import PageWithSideBar from './components/PageWithSidebar/PageWithSidebar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthPage from './features/login/components/AuthPage/AuthPage'
import { fetchMe } from './features/users/users.slice'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuth())
        dispatch(fetchMe())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Header />
            <main>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="reports" />}
                    />
                    <ProtectedRoute
                        path={[
                            '/reports',
                            '/submitBug',
                            '/report/:id',
                            '/shop',
                            '/inventory',
                        ]}
                    >
                        <PageWithSideBar />
                    </ProtectedRoute>
                    <Route path={['/login', '/signup']}>
                        <AuthPage />
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default App
