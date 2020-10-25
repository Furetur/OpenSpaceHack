import React, { useCallback, useMemo } from 'react'
import { selectCanBuyItem } from '../../shop.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { buyItem } from '../../shop.actions'

const BuyItemButton = ({ id }) => {
    const dispatch = useDispatch()
    const selector = useMemo(() => selectCanBuyItem(id), [id])
    const canBuy = useSelector(selector)

    const onClick = useCallback(() => {
        dispatch(buyItem(id))
    }, [dispatch, id])

    return (
        <button disabled={!canBuy} onClick={onClick}>
            Buy
        </button>
    )
}

export default BuyItemButton
