import * as WebSocket from 'ws'
import { Server as HttpServer } from 'http'

export interface ISocketServer extends WebSocket.Server {
    broadcast?: (data: string) => void
}

export interface IMessage {
    username?:     string,
    colour?:       string,
    content:       string,
    [key: string]: string,
    type:          string
}

export interface IHttpServer extends HttpServer { }
