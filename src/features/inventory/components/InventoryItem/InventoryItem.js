import React from 'react'
import { getShopItemImg, getShopItemName } from '../../../shop/shop.utils'
import PutOnButton from './PutOnButton/PutOnButton'
import styles from './InventoryItem.module.css'

const InventoryItem = ({ id }) => {
    return (
        <div className={styles.InventoryItem}>
            <img
                src={getShopItemImg(id)}
                alt={getShopItemName(id)}
                className={styles.img}
            />
            <span>{getShopItemName(id)}</span>
            <PutOnButton id={id} />
        </div>
    )
}

export default InventoryItem
