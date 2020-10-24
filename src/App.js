import React, {useEffect} from 'react';
import './App.css';
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import Login from "./features/login/components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, selectIsAuthorized} from "./features/login/login.slice";
import Header from "./components/Header/Header";
import PageWithSideBar from "./components/PageWithSidebar/PageWithSidebar";

function App() {
    const dispatch = useDispatch()
    const isAuthorized = useSelector(selectIsAuthorized)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return isAuthorized ? (
        <BrowserRouter>
            <Header/>
            <main>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="reports"/>
                    )}/>
                    <Route path={['/reports', '/submitBug', '/report/:id']}>
                        <PageWithSideBar />
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    ) : <Login/>
}

export default App;
