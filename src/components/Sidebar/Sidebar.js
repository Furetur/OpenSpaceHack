import React from 'react'
import styles from './Sidebar.module.css'
import SubmitBugButton from "../../features/reports/components/SubmitBugButton/SubmitBugButton";
import ReportsListWrapper from "../../features/reports/components/ReportsListWrapper/ReportsListWrapper";

const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
            <SubmitBugButton />
            <ReportsListWrapper />
        </div>
    )
}

export default Sidebar