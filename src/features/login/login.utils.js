export const saveAuthToken = (token) => {
    localStorage.setItem('auth_token', token)
}

export const getAuthToken = () => localStorage.getItem('auth_token')
