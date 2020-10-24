import {postReport} from "./reports.rest";
import isStatusOK from "../../utils/isStatusOK";
import Status from "../../utils/Status";
import {useCallback, useState} from "react";

const usePostReport = () => {
    const [status, setStatus] = useState(Status.IDLE)

    return [status, useCallback(async (report, onSuccess = () => {}, onFail = () => {}) => {
        console.log(Status.LOADING)
        setStatus(Status.LOADING)
        try {
            const response = await postReport(report)
            const json = await response.json()
            if (isStatusOK(response.status)) {
                debugger
                setStatus(Status.OK)
                onSuccess(json)
            } else {
                debugger
                setStatus(Status.FAILED)
                onFail()
            }
        } catch (e) {
            debugger
            setStatus(Status.FAILED)
            onFail()
        }
    }, [])]
}

export default usePostReport
