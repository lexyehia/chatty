import { ISocketServer, IMessage, IColourMap } from './../interfaces/app'
import { OPEN } from 'ws'
import * as uuid from 'uuid/v4'

export function chatRoomChannel(wss: ISocketServer) {

    //let userColours: IColourMap = {}
    const userColours: Map<string, string> = new Map()

    wss.broadcast = (data: string): void => {
        wss.clients.forEach((client: any): void => {
            if (client.readyState === OPEN) {
                client.send(data)
            }
        })
    }

    wss.on('connection', (ws): void => {
        assignUniqueColour(ws)
        broadcastUserCount()
        ws.on('message', (data: string) => processMessage(data, ws))
        ws.on('close', broadcastUserCount)
    })

    const processMessage = (json: string, socket: any) => {
        let message: IMessage = JSON.parse(json)
        message.key    = uuid()
        message.colour = userColours.get(socket._socket.remoteAddress)

        broadcastMessage(message)
    }

    const broadcastUserCount = (): void => {
        const clients: number = wss.clients.size
        const message: IMessage = {
            type:     "count",
            content:  clients.toString()
        }

        broadcastMessage(message)
    }

    const assignUniqueColour = (socket: any): void => {
        const colours = ["00C5CD", "5959AB", "660000", "C48E48"]
        const i = Math.floor(Math.random() * 4)

        userColours.set(socket._socket.remoteAddress, colours[i])
    }

    const broadcastMessage = (message: IMessage): void => {
        wss.broadcast(JSON.stringify(message))
    }
}
