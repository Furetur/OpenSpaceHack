import {HOST} from "../../constants";
import {saveAuthToken} from "./login.utils";

export const requestAuthToken = async (username, password) => {
    const response = await fetch(`${HOST}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    })
    const authHeader = response.headers.get('Authorization')
    if (response.status !== 200 || authHeader == null) {
        throw Error('Auth failed')
    }
    return authHeader
}

export const requestLogin = async (username, password) => {
    const authToken = await requestAuthToken(username, password)
    saveAuthToken(authToken)
}
