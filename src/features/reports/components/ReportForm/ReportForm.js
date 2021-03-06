import React, { useCallback } from 'react'
import usePostReport from '../../reports.hooks'
import Status from '../../../../utils/Status'
import { useDispatch, useSelector } from 'react-redux'
import { receiveReport, selectReport } from '../../reports.slice'
import styles from './ReportForm.module.css'
import useInputValue from '../../../../utils/useInputValue'
import {parseReportFromRest} from "../../reports.rest";

const ReportForm = ({ onSuccess = () => {}, id }) => {
    const dispatch = useDispatch()

    const report = useSelector((state) => selectReport(state, id))

    const [status, postReport] = usePostReport()

    const [product, setProduct] = useInputValue()
    const [version, setVersion] = useInputValue()
    const [os, setOs] = useInputValue()
    const [title, setTitle] = useInputValue()
    const [description, setDescription] = useInputValue()

    const onOk = useCallback(
        (receivedReport) => {
            const report = parseReportFromRest(receivedReport)
            dispatch(receiveReport(report))
            onSuccess()
        },
        [dispatch, onSuccess]
    )

    const fakeAddReportAnyway = useCallback((report) => () => {
        dispatch(receiveReport({
            ...report,
            id: Math.floor(Math.random() * 100),
        }))
    }, [dispatch])

    const submit = useCallback(
        (e) => {
            e.preventDefault()
            postReport(
                {
                    tested_system: product,
                    beta_version: version,
                    bug_name: title,
                    os_model: os,
                    description,
                },
                onOk,
                fakeAddReportAnyway({
                    testedSystem: product,
                    betaVersion: version,
                    bugName: title,
                    OSModel: os,
                    description,
                })
            )
        },
        [description, fakeAddReportAnyway, onOk, os, postReport, product, title, version]
    )

    return (
        <div className={styles.FormBackground}>
            <form className={styles.ReportForm}>
                <h2>{report == null ? 'Submit a bug' : 'Bug report'}</h2>
                <div className={styles.ReportFormRow}>
                    <div className={styles.ReportFormCol}>
                        <label>
                            Product
                            <input
                                type="text"
                                onChange={setProduct}
                                value={report?.product ?? product}
                                disabled={report != null}
                            />
                        </label>
                        <label>
                            Version
                            <input
                                type="text"
                                onChange={setVersion}
                                value={report?.betaVersion ?? version}
                                disabled={report != null}
                            />
                        </label>
                        <label>
                            OS
                            <input
                                type="text"
                                onChange={setOs}
                                value={report?.OSModel ?? os}
                                disabled={report != null}
                            />
                        </label>
                        <label>
                            Title
                            <input
                                type="text"
                                onChange={setTitle}
                                value={report?.bugName ?? title}
                                disabled={report != null}
                            />
                        </label>
                    </div>
                    <div className={styles.ReportFormCol}>
                        <label>
                            Description
                            <textarea
                                cols="30"
                                rows="10"
                                onChange={setDescription}
                                value={report?.description ?? description}
                                disabled={report != null}
                            />
                        </label>
                    </div>
                    <div className={styles.ReportFormCol}>
                        <label>
                            Upload image
                            <input
                                type="file"
                                name="file"
                                disabled={report != null}
                            />
                            <br />
                        </label>
                    </div>
                </div>
                {report == null && (
                    <button onClick={submit} className={styles.SubmitButton}>
                        Submit
                    </button>
                )}
                {status === Status.FAILED && <span>Failed</span>}
                {status === Status.OK && <span>OK</span>}
            </form>
        </div>
    )
}

export default ReportForm
