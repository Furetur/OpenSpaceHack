import {createSelector} from "@reduxjs/toolkit"
import {selectMe} from "../users/users.slice";
import {getShopItemPrice} from "./shop.utils";

export const selectCanBuyItem = (itemId) => createSelector(
    selectMe,
    (me) => me?.money >= getShopItemPrice(itemId)
)
