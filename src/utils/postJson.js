import {getAuthToken} from "../features/login/login.utils";
import {HOST} from "../constants";

const postJson = async (url, json, authenticated = true, stringify = true) => {
    const authToken = getAuthToken()
    const headers = authToken == null || !authenticated ? {} : {Authorization: `Bearer ${authToken}`}
    return await fetch(`${HOST}/${url}`, {
        method: 'POST',
        headers,
        body: stringify ? JSON.stringify(json) : json
    })
}

export default postJson
