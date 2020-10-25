import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { fetchSingleReport } from '../../reports.slice'
import styles from './FullScreenReport.module.css'
import ReportForm from '../ReportForm/ReportForm'

const FullScreenReport = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchSingleReport(id))
    }, [dispatch, id])

    return (
        <div className={styles.FullScreenReport}>
            <ReportForm id={id} />
        </div>
    )
}

export default FullScreenReport
