import shopConfig from "./shop.config";

export const getAllShopItemsIds = () => Object.keys(shopConfig)

export const getShopItemName = (shopItemId) => shopConfig[shopItemId].name

export const getShopItemImg = (shopItemId) => shopConfig[shopItemId].img

export const getShopItemPrice = (shopItemId) => shopConfig[shopItemId].price
