import React, {useCallback, useState} from 'react'
import usePostReport from "../../reports.hooks";
import Status from "../../../../utils/Status";
import {useDispatch} from "react-redux";
import {receiveReport} from "../../reports.slice";
import styles from './ReportForm.module.css'

const useInputValue = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue)
    const onChange = useCallback((event) => setValue(event.target.value), [])
    return [value, onChange]
}

const ReportForm = ({onSuccess = () => {}}) => {
    const dispatch = useDispatch()
    const [status, postReport] = usePostReport()

    const [product, setProduct] = useInputValue()
    const [version, setVersion] = useInputValue()
    const [os, setOs] = useInputValue()
    const [title, setTitle] = useInputValue()
    const [description, setDescription] = useInputValue()

    const onOk = useCallback((report) => {
        dispatch(receiveReport(report))
        onSuccess()
    }, [dispatch, onSuccess])

    const submit = useCallback((e) => {
        e.preventDefault()
        postReport({
            testedSystem: product,
            betaVersion: version,
            bugName: title,
            OSModel: os,
            description,
        }, onOk)
    }, [description, onOk, os, postReport, product, title, version])

    return (
        <div className={styles.FormBackground}>
            <form className={styles.ReportForm}>
                <h2>Submit a bug</h2>
                <div className={styles.ReportFormRow}>
                    <div className={styles.ReportFormCol}>
                        <label>
                            Product
                            <input type="text" onChange={setProduct}/>
                        </label>
                        <label>
                            Version
                            <input type="text" onChange={setVersion}/>
                        </label>
                        <label>
                            OS
                            <input type="text" onChange={setOs}/>
                        </label>
                        <label>
                            Title
                            <input type="text" onChange={setTitle}/>
                        </label>
                    </div>
                    <div className={styles.ReportFormCol}>
                        <label>
                            Description
                            <textarea cols="30" rows="10" onChange={setDescription}>
                            </textarea>
                        </label>
                    </div>
                    <div className={styles.ReportFormCol}>
                        <label>
                            Upload image
                            <input type="file" name="file"/><br />
                        </label>
                    </div>
                </div>
                <button onClick={submit} className={styles.SubmitButton}>Submit</button>
                {status === Status.FAILED && <span>Failed</span>}
                {status === Status.OK && <span>OK</span>}
            </form>
        </div>
    )
}

export default ReportForm
