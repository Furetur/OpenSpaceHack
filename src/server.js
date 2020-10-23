import {createServer, Response, Model} from 'miragejs'

const me = {
    id: 0,
    username: 'user',
    points: 10,
}

const otherUser = {
    id: 1,
    username: 'otheruser',
    points: 20
}

const configureServer = () => createServer({
    models: {
        user: Model,
        report: Model,
    },
    seeds(server) {
        server.create('user', me)
        server.create('user', otherUser)
        server.create('report', {id: 0, title: 'Somebodys report', verified: false, author: otherUser})
        server.create('report', {id: 1, title: 'Somebodys report. Verified', verified: true, author: otherUser})
        server.create('report', {id: 2, title: 'My report', verified: false, author: me})
        server.create('report', {id: 3, title: 'My report. Verified', verified: true, author: me})
    },
    routes() {
        this.post('/login', (schema, request) => {
            const {username, password} = JSON.parse(request.requestBody)
            if (username === 'user' && password === 'pass') {
                return new Response(200, {Authorization: 'Bearer auth_token'}, me)
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
                return me
            } else {
                return new Response(401)
            }
        })

        this.get('/reports', (schema, request) => {
            const authHeader = request.requestHeaders['authorization']
            if (authHeader !== 'Bearer auth_token') {
                return new Response(401)
            }
            const author = request.queryParams.author
            const verified = request.queryParams.verified == null ? null : request.queryParams.verified === true

            const filterAuthor = report => author == null || (author === 'me' && report.author.id === me.id) || (!isNaN(parseInt(author)) && report.author.id === parseInt(author))
            const filterVerified = report => verified == null || report.verified === verified

            return schema.reports.all().filter(report => filterAuthor(report) && filterVerified(report))
        })
    }
})

export default configureServer
