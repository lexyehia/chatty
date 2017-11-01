import * as express from 'express'
import { Server as SocketServer, OPEN } from 'ws'
import * as morgan from 'morgan'
import * as uuid from 'uuid/v4'

const PORT = 3001

const server = express()
    .use(morgan('dev'))    
    .use('/public', express.static('./client/dist'))
    .listen(PORT, '0.0.0.0', () => {
        console.log(`Running Backend Server at http://0.0.0.0:${PORT}`)
})

interface mySocket extends SocketServer {
    broadcast?: (data: string) => void
}

const wss: mySocket = new SocketServer({ server })

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === OPEN) {
            client.send(data)
        }
    })
}

wss.on('connection', (ws) => {
    console.log('Client connected')

    ws.on('message', (data: string) => {
        processMessage(data)
    })

    ws.on('close', () => console.log('Client disconnected'))
})

interface Message {
    id?:     string,
    user:    string,
    message: string
}

function processMessage(json: string) {
    let message: Message = JSON.parse(json)
    message.id = uuid()
    broadcastMessage(message)
}

function broadcastMessage(message: Message): void {
    wss.broadcast(JSON.stringify(message))
}

