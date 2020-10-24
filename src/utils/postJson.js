import {getAuthToken} from "../features/login/login.utils";
import {HOST} from "../constants";

const postJson = async (url, json, authenticated = true) => {
    const authToken = getAuthToken()
    const headers = authToken == null || !authenticated ? {} : {Authorization: `Bearer ${authToken}`}
    return await fetch(`${HOST}/${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(json)
    })
}

export default postJson
