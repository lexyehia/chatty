import * as express from 'express'
import * as morgan from 'morgan'
import { Server as SocketServer } from 'ws'
import { ISocketServer, IHttpServer } from './interfaces/app'
import { chatRoomChannel } from './sockets/chat'

const PORT: number = 3001

/**
 * Initialize our Express http server
 * @return {IHttpServer} server
 */
const server: IHttpServer = express()
    .use(morgan('dev'))
    .use('/public', express.static('./client/dist'))
    .listen(PORT, '0.0.0.0', () => {
        console.log(`Running Backend Server at http://0.0.0.0:${PORT}`)
})

/**
 * Initialize a new socket server instance and
 * pass it to the chatroom module
 */
const wss: ISocketServer = new SocketServer({ server })
chatRoomChannel(wss)
