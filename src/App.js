import React, {useEffect} from 'react';
import './App.css';
import Tamagochi from "./features/tamagochi/Tamagochi";
import {BrowserRouter} from "react-router-dom";
import Login from "./features/login/components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, selectIsAuthorized} from "./features/login/login.slice";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

function App() {
    const dispatch = useDispatch()
    const isAuthorized = useSelector(selectIsAuthorized)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return isAuthorized ? (
        <BrowserRouter>
            {/*<Me/>*/}
            {/*<Switch>*/}
            {/*    <Route exact path="/">*/}
            {/*        content*/}
            {/*        <Tamagochi />*/}
            {/*        <SubmitBugButton />*/}
            {/*    </Route>*/}
            {/*    <Route path="/reports">*/}
            {/*        <ReportsListWrapper />*/}
            {/*    </Route>*/}
            {/*</Switch>*/}
            <Header/>
            <main>
                <Sidebar/>
                <Tamagochi/>
            </main>
        </BrowserRouter>
    ) : <Login/>
}

export default App;
