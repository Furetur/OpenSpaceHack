import { getAuthToken } from '../features/login/login.utils'
import { HOST } from '../constants'

const requestJson = async (url) => {
    const authToken = getAuthToken()
    const headers =
        authToken == null ? {} : { Authorization: `Bearer ${authToken}` }
    console.log('requesting json', `${HOST}/${url}`)
    const response = await fetch(`${HOST}/${url}`, {
        headers,
    })
    if (response.status !== 200) {
        throw Error('Response code was not 200')
    }
    return await response.json()
}

export default requestJson
