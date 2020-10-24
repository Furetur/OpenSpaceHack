import React, {useEffect} from 'react';
import './App.css';
import {Switch, BrowserRouter, Route} from "react-router-dom";
import Login from "./features/login/components/Login/Login";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./store";
import Me from "./features/users/components/Me/Me";
import {checkAuth, selectIsAuthorized} from "./features/login/login.slice";
import ReportsListWrapper from "./features/reports/components/ReportsListWrapper/ReportsListWrapper";
import Room from "./features/room/Room";
import SubmitBugButton from "./features/reports/components/SubmitBugButton/SubmitBugButton";

function App() {
    return (
        <Provider store={store}>
            <Game/>
        </Provider>
    );
}

function Game() {
    const dispatch = useDispatch()
    const isAuthorized = useSelector(selectIsAuthorized)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return isAuthorized ? <BrowserRouter>
        <Me/>
        <Switch>
            <Route exact path="/">
                content
                <Room />
                <SubmitBugButton />
            </Route>
            <Route path="/reports">
                <ReportsListWrapper />
            </Route>
        </Switch>
    </BrowserRouter> : <Login/>
}

export default App;
