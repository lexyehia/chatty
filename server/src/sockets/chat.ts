import { IMessage } from './../interfaces/app'
import * as http from 'http'
import * as WebSocket from 'ws'
import * as uuid from 'uuid/v4'


export default class ChatSocketServer extends WebSocket.Server {

    /**
     * Map to store our user/colour combinations
     */
    userColours: Map<string, string> = new Map()

    /**
     * Socket event listeners
     */
    startListening = (): void => {
        this.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
            this.assignUniqueColour(req)
            this.broadcastUserCount()
            ws.on('message', (data: string) => this.processMessage(data, req))
            ws.on('close', this.broadcastUserCount)
        })
    }

    /**
     * Process incoming messages, assigning them unique IDs and a colour
     * from the userColours Map
     * @param  {string} json incoming message
     * @param  {http.IncomingMessage} req
     */
    processMessage = (json: string, req: http.IncomingMessage): void => {
        let message: IMessage = JSON.parse(json)
        message.key    = uuid()
        message.colour = this.userColours.get(req.socket.remoteAddress)

        this.broadcast(JSON.stringify(message))
    }

    /**
     * Helper method to broadcast messages to all connected socket clients
     * @param  {string} data
     */
    broadcast = (data: string): void => {
        this.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        })
    }

    /**
     * Send the count of connected socket clients to everyone
     */
    broadcastUserCount = (): void => {
        const clients: number   = this.clients.size
        const message: IMessage = {
            type:     "count",
            content:  clients.toString()
        }

        this.broadcast(JSON.stringify(message))
    }

    /**
     * For each connection, see whether that IP address is already stored
     * in userColours Map, if not then store it and assign a random colour
     * from an array of four
     * @param  {http.IncomingMessage}
     */
    assignUniqueColour = (req: http.IncomingMessage): void => {
        if (!this.userColours.has(req.socket.remoteAddress)) {
            const colours = ["00C5CD", "5959AB", "660000", "C48E48"]
            const i = Math.floor(Math.random() * 4)

            this.userColours.set(req.socket.remoteAddress, colours[i])
        }
    }
}
