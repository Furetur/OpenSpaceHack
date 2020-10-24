import React, {useEffect, useMemo} from 'react'
import {fetchReports, selectReportsIds} from "../../reports.slice";
import {useDispatch, useSelector} from "react-redux";
import Report from "../Report/Report";

const ReportsList = ({reportsFilter}) => {
    const dispatch = useDispatch()

    const selector = useMemo(() => selectReportsIds(reportsFilter), [reportsFilter])
    const reportsIds = useSelector(selector)

    useEffect(() => {
        dispatch(fetchReports(reportsFilter))
    }, [dispatch, reportsFilter])

    debugger

    return (
        <div>
            <h2>Reports</h2>
            {reportsIds.map(id => <Report id={id} />)}
        </div>
    )
}

export default ReportsList