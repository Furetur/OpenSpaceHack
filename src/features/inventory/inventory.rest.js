import postJson from "../../utils/postJson";
import isStatusOK from "../../utils/isStatusOK";

export const requestPutOnItem = async (itemId) => {
    const response = await postJson('skin', itemId, true, false)
    if (!isStatusOK(response.status)) {
        throw Error('Status was not OK')
    } else {
        return response.json()
    }
}
