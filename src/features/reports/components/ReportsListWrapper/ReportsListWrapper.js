import React from 'react'
import {useLocation} from 'react-router-dom'
import {parseReportsFilter} from "../../reports.utils";
import ReportsList from "../ReportsList/ReportsList";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const useReportsFilter = () => {
    const query = useQuery()
    const author = query.get('author')
    const verified = query.get('verified')
    return parseReportsFilter(author, verified)
}

const ReportsListWrapper = () => {
    const reportsFilter = useReportsFilter()

    return (
        <ReportsList reportsFilter={reportsFilter} />
    )
}

export default ReportsListWrapper