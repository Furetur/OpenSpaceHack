import React, {useEffect} from 'react'
import {useParams} from "react-router";
import Report from "../Report/Report";
import {useDispatch} from "react-redux";
import {fetchSingleReport} from "../../reports.slice";
import styles from './FullScreenReport.module.css'

const FullScreenReport = () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchSingleReport(id))
    }, [dispatch, id])

    return (
        <div className={styles.FullScreenReport}>
            <Report id={id} />
        </div>
    )
}

export default FullScreenReport