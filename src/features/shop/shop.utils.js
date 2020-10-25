import shopConfig, { itemTypesToUserPropertyNames } from './shop.config'

export const getAllShopItemsIds = () => Object.keys(shopConfig)

export const getShopItemName = (shopItemId) => shopConfig[shopItemId].name

export const getShopItemImg = (shopItemId) => shopConfig[shopItemId].img

export const getShopItemPrice = (shopItemId) => shopConfig[shopItemId].price

export const getShopItemType = (shopItemId) => shopConfig[shopItemId].type

export const getUserPropertyNameForItemType = (itemType) =>
    itemTypesToUserPropertyNames[itemType]

export const getUserPropertyNameForShopItem = (shopItemId) =>
    getUserPropertyNameForItemType(getShopItemType(shopItemId))
