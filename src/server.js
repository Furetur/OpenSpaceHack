import {createServer, Response} from 'miragejs'

const user = {
    id: 0,
    username: 'user',
    points: 10,
}

const configureServer = () => createServer({
    routes() {
        this.post('/login', (schema, request) => {
            const {username, password} = JSON.parse(request.requestBody)
            if (username === 'user' && password === 'pass') {
                return new Response(200, {Authorization: 'Bearer auth_token'}, user)
            } else {
                return new Response(401)
            }
        })

        this.post('/signup', () => {
            return new Response(200)
        })

        this.get('/me', (schema, request) => {
            const authHeader = request.requestHeaders['authorization']
            if (authHeader === 'Bearer auth_token') {
                return user
            } else {
                return new Response(401)
            }

        })
    }
})

export default configureServer
