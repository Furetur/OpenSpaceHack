import React from 'react'
import Sidebar from "../Sidebar/Sidebar";
import {Route, Switch} from "react-router-dom";
import Tamagochi from "../../features/tamagochi/Tamagochi";
import ReportForm from "../../features/reports/components/ReportForm/ReportForm";
import FullScreenReport from "../../features/reports/components/FullScreenReport/FullScreenReport";

const PageWithSideBar = () => {
    return (
        <>
            <Sidebar/>
            <Switch>
                <Route path="/reports">
                    <Tamagochi/>
                </Route>
                <Route path="/submitBug">
                    <ReportForm/>
                </Route>
                <Route path="/report/:id">
                    <FullScreenReport/>
                </Route>
            </Switch>
        </>
    )
}

export default PageWithSideBar