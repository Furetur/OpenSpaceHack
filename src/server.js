import {createServer, Response, Model} from 'miragejs'
import {Role} from "./features/users/users.types";
import {getShopItemPrice} from "./features/shop/shop.utils";

const me = {
    id: 0,
    username: 'user',
    first_name: 'Admin',
    second_name: 'Adminovich',
    last_name: 'Adminov',
    role: Role.ADMIN,
    money: 100,
    petId: 0,
    petRank: 100,
    inventory: [0, 1, 0, 0, 1],
    pet_hat: 0,
}

const otherUser = {
    id: 1,
    username: 'user2',
    first_name: 'Loser',
    second_name: 'Loh',
    last_name: 'Chmo',
    role: Role.USER,
    money: 0,
    petId: 0,
    petRank: 100,
    inventory: [],
    pet_hat: undefined,
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
        this.post('/buy', (schema, request) => {
            const id = parseInt(request.requestBody)
            const price = getShopItemPrice(id)
            if (me.money >= price) {
                return new Response(202, {}, [...me.inventory, id])
            } else {
                return new Response(401)
            }
        })
        this.post('/skin', me)
    }
})

export default configureServer
