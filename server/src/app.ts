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
    UserColours.assignUniqueColour(ws)
    broadcastUserCount()
    ws.on('message', (data: string) => processMessage(data, ws))
    ws.on('close', broadcastUserCount)
})

interface Message {
    id?:     string,
    user?:   string,
    content: string,
    type:    string,
    colour?: string
}

function processMessage(json: string, socket: any) {
    let message: Message = JSON.parse(json)
    message.id = uuid()
    message.colour = UserColours.retrieveUserColour(socket)
    broadcastMessage(message)
}

function broadcastMessage(message: Message): void {
    wss.broadcast(JSON.stringify(message))
}

function broadcastUserCount(): void {
    const clients: number = wss.clients.size
    const message: Message = {
        type:    "count",
        content: clients.toString()
    }

    wss.clients.forEach((c: any) => {
        console.log(c._socket.remoteAddress)
    })

    broadcastMessage(message)
}

class UserColours {

    static userColours: { [i: string]: string } = {}

    static assignUniqueColour(socket: any) {
        const colours = ["00C5CD", "5959AB", "660000", "C48E48"]
        const i = Math.floor(Math.random() * 4)
        console.log(this.userColours)
        this.userColours[socket._socket.remoteAddress] = colours[i]
    }

    static retrieveUserColour(socket: any): string {
        return this.userColours[socket._socket.remoteAddress]
    }
}