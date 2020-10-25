import { createAsyncThunk } from '@reduxjs/toolkit'
import { requestBuyItem } from './shop.rest'

export const buyItem = createAsyncThunk('shop/buyItem', (shopItemId) =>
    requestBuyItem(shopItemId)
)
