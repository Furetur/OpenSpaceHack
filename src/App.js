import React, {useEffect} from 'react';
import './App.css';
import Tamagochi from "./features/tamagochi/Tamagochi";
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import Login from "./features/login/components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, selectIsAuthorized} from "./features/login/login.slice";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ReportForm from "./features/reports/components/ReportForm/ReportForm";

function App() {
    const dispatch = useDispatch()
    const isAuthorized = useSelector(selectIsAuthorized)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return isAuthorized ? (
        <BrowserRouter>
            <Redirect exact from="/" to="reports"/>
            <Header/>
            <main>
                <Sidebar/>
                <Switch>
                    <Route path="/reports">
                        <Tamagochi/>
                    </Route>
                    <Route path="/submitBug">
                        <ReportForm />
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    ) : <Login/>
}

export default App;
