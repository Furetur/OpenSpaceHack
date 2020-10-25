import postJson from "../../utils/postJson";
import isStatusOK from "../../utils/isStatusOK";

export const requestBuyItem = async (itemId) => {
    const response = await postJson('buy', itemId, true, false)
    if (!isStatusOK(response.status)) {
        throw Error('Could not buy item')
    } else {
        return response.json()
    }
}
