import {getAuthToken} from "../features/login/login.utils";
import {HOST} from "../constants";

const postJson = async (url, json, authenticated = true) => {
    const authToken = getAuthToken()
    const headers = authToken == null || !authenticated ? {} : {Authorization: `Bearer ${authToken}`}
    const response = await fetch(`${HOST}/${url}`, {
        headers,
        body: JSON.stringify(json)
    })
    return await response.json()
}

export default postJson
