import { ISocketServer, IMessage } from './../interfaces/app'
import * as http from 'http'
import * as WebSocket from 'ws'
import * as uuid from 'uuid/v4'

export function chatRoomChannel(wss: ISocketServer) {

    /**
     * Map to store our user/colour combinations
     */
    const userColours: Map<string, string> = new Map()

    /**
     * Socket event listeners
     */
    wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
        assignUniqueColour(req)
        broadcastUserCount()
        ws.on('message', (data: string) => processMessage(data, req))
        ws.on('close', broadcastUserCount)
    })

    /**
     * Helper method to broadcast messages to all connected socket clients
     * @param  {string} data
     */
    wss.broadcast = (data: string): void => {
        wss.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        })
    }

    /**
     * Process incoming messages, assigning them unique IDs and a colour
     * from the userColours Map
     * @param  {string} json incoming message
     * @param  {http.IncomingMessage} req
     */
    const processMessage = (json: string, req: http.IncomingMessage) => {
        let message: IMessage = JSON.parse(json)
        message.key    = uuid()
        message.colour = userColours.get(req.socket.remoteAddress)

        wss.broadcast(JSON.stringify(message))
    }

    /**
     * Send the count of connected socket clients to everyone
     */
    const broadcastUserCount = (): void => {
        const clients: number   = wss.clients.size
        const message: IMessage = {
            type:     "count",
            content:  clients.toString()
        }

        wss.broadcast(JSON.stringify(message))
    }

    /**
     * For each connection, see whether that IP address is already stored
     * in userColours Map, if not then store it and assign a random colour
     * from an array of four
     * @param  {http.IncomingMessage}
     */
    const assignUniqueColour = (req: http.IncomingMessage): void => {
        if (!userColours.has(req.socket.remoteAddress)) {
            const colours = ["00C5CD", "5959AB", "660000", "C48E48"]
            const i = Math.floor(Math.random() * 4)
            userColours.set(req.socket.remoteAddress, colours[i])
        }
    }
}
