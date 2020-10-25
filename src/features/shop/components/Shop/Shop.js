import React, { useEffect } from 'react'
import { getAllShopItemsIds } from '../../shop.utils'
import ShopItem from '../ShopItem/ShopItem'
import { useDispatch } from 'react-redux'
import { fetchMe } from '../../../users/users.slice'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMe())
    }, [dispatch])

    const allShopItemIds = getAllShopItemsIds()

    return (
        <div>
            {allShopItemIds.map((id) => (
                <ShopItem key={id} id={id} />
            ))}
        </div>
    )
}

export default Shop
