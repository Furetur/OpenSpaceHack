import React from 'react'
import styles from './Sidebar.module.css'
import SubmitBugButton from "../../features/reports/components/SubmitBugButton/SubmitBugButton";
import ReportsListWrapper from "../../features/reports/components/ReportsListWrapper/ReportsListWrapper";
import {Switch, Route} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
            <SubmitBugButton />
            <Switch>
                <Route path={["/reports", "/report/:id"]}>
                    <ReportsListWrapper />
                </Route>
            </Switch>
        </div>
    )
}

export default Sidebar