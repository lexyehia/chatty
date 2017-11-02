import { IMessage } from './../interfaces/app'
import * as http from 'http'
import * as WebSocket from 'ws'
import * as uuid from 'uuid/v4'
import * as Redis from 'redis'

export default class ChatSocketServer extends WebSocket.Server {

    /**
     * Map to store our user/colour combinations
     */
    userColours: Map<string, string> = new Map()
    redis: Redis.RedisClient = Redis.createClient(process.env.REDIS_URL)

    /**
     * Socket event listeners
     */
    listen = (): void => {
        this.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
            this.assignUniqueColour(req)
            this.broadcastUserCount()
            this.sendChatHistory(ws)
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
        const message: IMessage = JSON.parse(json)
        message.key    = uuid()
        message.colour = this.userColours.get(req.socket.remoteAddress)
        this.redis.zadd("msgset", Date.now(), JSON.stringify(message),
        (err, resp) => {
            if (err) console.log(err)
            this.broadcast(message)
        })
    }

    /**
     * Helper method to broadcast messages to all connected socket clients
     * @param  {string} data
     */
    broadcast = (data: object): void => {
        const jsonData: string = JSON.stringify(data)

        this.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(jsonData)
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

        this.broadcast(message)
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

    /**
     * Send last 10 cached messages to newly-connected clients
     * @param  {WebSocket} client
     */
    sendChatHistory(client: WebSocket) {
        this.redis.zrange("msgset", -10, -1,
        (err: Error, msgs: string[]) => {
            if (err) console.log(err)
            const msgHistory: IMessage[] = msgs.map(m => JSON.parse(m))
            client.send(JSON.stringify(msgHistory))
        })
    }
}
