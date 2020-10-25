import React, {useCallback, useMemo} from 'react'
import {selectIsClothingItemOnMe} from "../../../../users/users.slice";
import {useDispatch, useSelector} from "react-redux";
import {putOnItem} from "../../../inventory.actions";

const PutOnButton = ({id}) => {
    const dispatch = useDispatch()

    const selectIsItemAlreadyOnMe = useMemo(() => selectIsClothingItemOnMe(id), [id])
    const isItemAlreadyOnMe = useSelector(selectIsItemAlreadyOnMe)

    const putOn = useCallback(() => {
        dispatch(putOnItem(id))
    }, [dispatch, id])

    return (
        <button disabled={isItemAlreadyOnMe} onClick={putOn}>{isItemAlreadyOnMe ? 'On you!' : 'Put on'}</button>
    )
}

export default PutOnButton
