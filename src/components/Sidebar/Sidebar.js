import React from 'react'
import styles from './Sidebar.module.css'
import SubmitBugButton from "../../features/reports/components/SubmitBugButton/SubmitBugButton";
import ReportsListWrapper from "../../features/reports/components/ReportsListWrapper/ReportsListWrapper";
import {Route} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
            <Route path={['/reports', '/report/:id']}>
                <SubmitBugButton />
            </Route>
            <Route path={['/reports', '/report/:id', '/submitBug']}>
                <ReportsListWrapper />
            </Route>
        </div>
    )
}

export default Sidebar