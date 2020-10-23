import {createServer, Response} from 'miragejs'

const configureServer = () => createServer({
    routes() {
        this.post('/login', (schema, request) => {
            const {username, password} = JSON.parse(request.requestBody)
            if (username === 'user' && password === 'pass') {
                return new Response(200, {Authorization: 'Bearer auth_token'})
            } else {
                return new Response(401)
            }
        })

        this.post('/signup', () => {
            return new Response(200)
        })
    }
})

export default configureServer
