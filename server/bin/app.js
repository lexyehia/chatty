"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ws_1 = require("ws");
const morgan = require("morgan");
const uuid = require("uuid/v4");
const PORT = 3001;
const server = express()
    .use(morgan('dev'))
    .use('/public', express.static('./client/dist'))
    .listen(PORT, '0.0.0.0', () => {
    console.log(`Running Backend Server at http://0.0.0.0:${PORT}`);
});
const wss = new ws_1.Server({ server });
wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.OPEN) {
            client.send(data);
        }
    });
};
wss.on('connection', (ws) => {
    console.log('Client connected');
    UserColours.assignUniqueColour(ws);
    broadcastUserCount();
    ws.on('message', (data) => processMessage(data, ws));
    ws.on('close', broadcastUserCount);
});
function processMessage(json, socket) {
    let message = JSON.parse(json);
    message.id = uuid();
    message.colour = UserColours.retrieveUserColour(socket);
    broadcastMessage(message);
}
function broadcastMessage(message) {
    wss.broadcast(JSON.stringify(message));
}
function broadcastUserCount() {
    const clients = wss.clients.size;
    const message = {
        type: "count",
        content: clients.toString()
    };
    wss.clients.forEach((c) => {
        console.log(c._socket.remoteAddress);
    });
    broadcastMessage(message);
}
class UserColours {
    static assignUniqueColour(socket) {
        const colours = ["00C5CD", "5959AB", "660000", "C48E48"];
        const i = Math.floor(Math.random() * 4);
        console.log(this.userColours);
        this.userColours[socket._socket.remoteAddress] = colours[i];
    }
    static retrieveUserColour(socket) {
        return this.userColours[socket._socket.remoteAddress];
    }
}
UserColours.userColours = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrQztBQUNsQywyQkFBaUQ7QUFDakQsaUNBQWdDO0FBQ2hDLGdDQUErQjtBQUUvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUE7QUFFakIsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFO0tBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQy9DLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZFLENBQUMsQ0FBQyxDQUFBO0FBTUYsTUFBTSxHQUFHLEdBQWEsSUFBSSxXQUFZLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBRWxELEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNyQixHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssU0FBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JCLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUVELEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQy9CLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNsQyxrQkFBa0IsRUFBRSxDQUFBO0lBQ3BCLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDNUQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUMsQ0FBQTtBQVVGLHdCQUF3QixJQUFZLEVBQUUsTUFBVztJQUM3QyxJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDbkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDN0IsQ0FBQztBQUVELDBCQUEwQixPQUFnQjtJQUN0QyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUMxQyxDQUFDO0FBRUQ7SUFDSSxNQUFNLE9BQU8sR0FBVyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUN4QyxNQUFNLE9BQU8sR0FBWTtRQUNyQixJQUFJLEVBQUssT0FBTztRQUNoQixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRTtLQUM5QixDQUFBO0lBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDeEMsQ0FBQyxDQUFDLENBQUE7SUFFRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM3QixDQUFDO0FBRUQ7SUFJSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBVztRQUNqQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3hELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFXO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDekQsQ0FBQzs7QUFYTSx1QkFBVyxHQUE0QixFQUFFLENBQUEifQ==