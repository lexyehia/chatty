import * as express from 'express'
import { Server as SocketServer } from 'ws'

const PORT = 3001

const server = express()
    .use('/public', express.static('./client/dist'))
    //.get('/', (req, res) => res.redirect('/public/index.html'))
    .listen(PORT, '0.0.0.0', () => {
    console.log(`listening on ${PORT}`)
})

const wss = new SocketServer({ server })

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => console.log('Client disconnected'));
})
