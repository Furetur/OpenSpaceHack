import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectMe} from "../../users.slice";
import {fetchMe} from "../../../me/me.slice";

const Me = () => {
    const dispatch = useDispatch()
    const me = useSelector(selectMe)

    useEffect(() => {
        dispatch(fetchMe())
    }, [dispatch])


    return (
        <div>
            {me == null ? <span>You are not logged in</span> : <span>
                Your username: {me.username}
            </span>}
        </div>
    )
}

export default Me