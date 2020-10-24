import {HOST} from "../../constants";
import {saveAuthToken} from "./login.utils";

export const requestLogin = async (username, password) => {
    const response = await fetch(`${HOST}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    })
    const authHeader = response.headers.get('Authorization')
    if (response.status !== 200 || authHeader == null) {
        debugger
        throw Error('Auth failed')
    }
    const authToken = authHeader.slice(7)
    saveAuthToken(authToken)
    return await response.json()
}
