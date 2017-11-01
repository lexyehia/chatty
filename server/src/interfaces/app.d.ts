import { Server as SocketServer } from 'ws'
import { Server as HttpServer } from 'http'

export interface ISocketServer extends SocketServer {
    broadcast?: (data: string) => void
}

export interface IMessage {
    username?:     string,
    colour?:       string,
    content:       string,
    [key: string]: string,
    type:          string
}

export interface IColourMap {
    [ip: string]:  string
}

export interface IHttpServer extends HttpServer { }
