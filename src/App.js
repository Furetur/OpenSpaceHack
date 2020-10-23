import React from 'react';
import './App.css';
import {Switch, BrowserRouter, Route, Link} from "react-router-dom";
import Login from "./features/login/components/Login/Login";
import {Provider} from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Link to="/login">Login</Link>
                    </Route>
                    <Route path="/login">
                        <Login/>
                        <Link to="/">Back</Link>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
