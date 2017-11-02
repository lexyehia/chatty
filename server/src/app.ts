import * as express from 'express'
import * as morgan from 'morgan'
import * as http from 'http'
import ChatSocketServer from './sockets/chat'

const PORT: number = 3001

/**
 * Initialize our Express http server
 * @return {http.Server} server
 */
const server: http.Server = express()
    .use(morgan('dev'))
    .use('/public', express.static('./client/dist'))
    .listen(PORT, '0.0.0.0', () => {
        console.log(`Running Backend Server at http://0.0.0.0:${PORT}`)
})

/**
 * Initialize a new socket server instance and
 * pass it to the chatroom module
 */
const chatWSS = new ChatSocketServer({ server })
    .startListening()
