import React from 'react'
import {useSelector} from "react-redux";
import {selectReport} from "../../reports.slice";
import bugImg from './bug.png'
import styles from './Report.module.css'
import {Link} from "react-router-dom";


const Report = ({id}) => {
    const report = useSelector(state => selectReport(state, id))
    return report != null ? (
        <div className={styles.Report}>
            <div className={styles.image}>
                <Link to={`report/${report.id}`}>
                    <img src={bugImg} alt="Bug"/>
                </Link>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>
                    <Link to={`report/${report.id}`}>{report.bugName}</Link>
                </div>
                <div className="star-rating" id="report1">
                    {report.verified === true ? 'Verified' : ''}
                </div>
                <div className="points-box" id="points1">
                    {report.description}
                </div>
            </div>
        </div>
    ) : <span>Loading...</span>
}

export default Report