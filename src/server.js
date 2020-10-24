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
        server.create('report', {
            id: 0,
            testedSystem: 'product',
            betaVersion: 'sds',
            OSModel: 'osmodel',
            description: 'asdsd',
            bugName: 'Somebodys report',
            verified: false,
            username: otherUser.username
        })
        server.create('report', {
            id: 1,
            testedSystem: 'product',
            betaVersion: 'sds',
            OSModel: 'osmodel',
            description: 'asdsd',
            bugName: 'Somebodys report. Verified',
            verified: true,
            username: otherUser.username
        })
        server.create('report', {
            id: 2,
            testedSystem: 'product',
            betaVersion: 'sds',
            OSModel: 'osmodel',
            description: 'asdsd',
            bugName: 'My report',
            verified: false,
            username: me.username
        })
        server.create('report', {
            id: 3,
            testedSystem: 'product',
            betaVersion: 'sds',
            OSModel: 'osmodel',
            description: 'asdsd',
            bugName: 'My report. Verified',
            verified: true,
            username: me.username
        })
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
            const verified = request.queryParams.verified == null ? null : request.queryParams.verified === 'true'

            const filterAuthor = report => author == null || (author === 'me' && report.author.id === me.id) || (!isNaN(parseInt(author)) && report.author.id === parseInt(author))
            const filterVerified = report => verified == null || report.verified === verified

            return schema.reports.all().filter(report => filterAuthor(report) && filterVerified(report)).models
        })

        this.get('/report/:id', (schema, request) => {
            const id = request.params.id
            return schema.reports.find(id).toJSON()
        })
        this.post('/report', (schema, request) => {
            const body = JSON.parse(request.requestBody)
            if (body.testedSystem !== 'a') {
                return new Response(401)
            } else {
                return new Response(202, {}, {
                    ...body,
                    id: 0,
                })
            }
        })
    }
})

export default configureServer
