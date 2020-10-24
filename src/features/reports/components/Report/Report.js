import React from 'react'
import {useSelector} from "react-redux";
import {selectReport} from "../../reports.slice";
import bugImg from './bug.png'
import styles from './Report.module.css'


const Report = ({id}) => {
    const report = useSelector(state => selectReport(state, id))
    return report != null ? (
        <div className={styles.Report}>
            <div className={styles.image}>
                <a href="">
                    <img src={bugImg} alt="Bug"/>
                </a>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>
                    <a href="">{report.bugName}</a>
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