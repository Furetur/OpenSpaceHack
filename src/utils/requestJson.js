import {getAuthToken} from "../features/login/login.utils";
import {HOST} from "../constants";

const requestJson = async (url) => {
    const authToken = getAuthToken()
    const headers = authToken == null ? {} : {Authorization: `Bearer ${authToken}`}
    const response = await fetch(`${HOST}/${url}`, {
        headers,
    })
    return await response.json()
}

export default requestJson
