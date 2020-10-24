import React from 'react'
import {useSelector} from "react-redux";
import {selectReport} from "../../reports.slice";

const Report = ({id}) => {
    const report = useSelector(state => selectReport(state, id))
    return report != null ? (
        <div>
            <div>Author: {report.authorId}</div>
            <div>Title: {report.title}</div>
            <div>Verified: {report.verified}</div>
        </div>
    ) : <div>Loading...</div>
}

export default Report