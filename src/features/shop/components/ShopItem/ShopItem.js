import React from 'react'
import {getShopItemImg, getShopItemName, getShopItemPrice} from "../../shop.utils";
import styles from './ShopItem.module.css'
import BuyItemButton from "../BuyItemButton/BuyItemButton";

const ShopItem = ({id}) => {
    return (
        <div className={styles.ShopItem}>
            <span>{getShopItemName(id)}</span>
            <span>Price: {getShopItemPrice(id)}</span>
            <img src={getShopItemImg(id)} alt={getShopItemName(id)} className={styles.img}/>
            <BuyItemButton id={id} />
        </div>
    )
}

export default ShopItem
