import { requestPutOnItem } from './inventory.rest'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const putOnItem = createAsyncThunk('inventory/putOnItem', (itemId) =>
    requestPutOnItem(itemId)
)
