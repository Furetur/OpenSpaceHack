import React, { useEffect } from 'react'
import html from './vanilla/tamagochi.html'
import './vanilla/style.css'
import { main } from './vanilla/script'
import { useSelector } from 'react-redux'
import { selectMyClothingItem } from '../users/users.slice'
import { ItemType } from '../shop/shop.config'
import { getShopItemImg } from '../shop/shop.utils'

const Tamagochi = () => {
    const myHat = useSelector(selectMyClothingItem(ItemType.HAT))
    const myHatImg = myHat != null ? getShopItemImg(myHat) : undefined

    useEffect(() => {
        main(myHatImg)
    }, [myHatImg])

    return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Tamagochi
