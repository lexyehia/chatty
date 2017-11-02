"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const uuid = require("uuid/v4");
const Redis = require("redis");
class ChatSocketServer extends WebSocket.Server {
    constructor() {
        super(...arguments);
        /**
         * Map to store our user/colour combinations
         */
        this.userColours = new Map();
        this.redis = Redis.createClient(process.env.REDIS_URL);
        /**
         * Socket event listeners
         */
        this.listen = () => {
            this.on('connection', (ws, req) => {
                this.assignUniqueColour(req);
                this.broadcastUserCount();
                this.sendChatHistory(ws);
                ws.on('message', (data) => this.processMessage(data, req));
                ws.on('close', this.broadcastUserCount);
            });
        };
        /**
         * Process incoming messages, assigning them unique IDs and a colour
         * from the userColours Map
         * @param  {string} json incoming message
         * @param  {http.IncomingMessage} req
         */
        this.processMessage = (json, req) => {
            const message = JSON.parse(json);
            message.key = uuid();
            message.colour = this.userColours.get(req.socket.remoteAddress);
            this.redis.zadd("msgset", Date.now(), JSON.stringify(message), (err, resp) => {
                if (err)
                    console.log(err);
                this.broadcast(message);
            });
        };
        /**
         * Helper method to broadcast messages to all connected socket clients
         * @param  {string} data
         */
        this.broadcast = (data) => {
            const jsonData = JSON.stringify(data);
            this.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(jsonData);
                }
            });
        };
        /**
         * Send the count of connected socket clients to everyone
         */
        this.broadcastUserCount = () => {
            const clients = this.clients.size;
            const message = {
                type: "count",
                content: clients.toString()
            };
            this.broadcast(message);
        };
        /**
         * For each connection, see whether that IP address is already stored
         * in userColours Map, if not then store it and assign a random colour
         * from an array of four
         * @param  {http.IncomingMessage}
         */
        this.assignUniqueColour = (req) => {
            if (!this.userColours.has(req.socket.remoteAddress)) {
                const colours = ["00C5CD", "5959AB", "660000", "C48E48"];
                const i = Math.floor(Math.random() * 4);
                this.userColours.set(req.socket.remoteAddress, colours[i]);
            }
        };
    }
    /**
     * Send last 10 cached messages to newly-connected clients
     * @param  {WebSocket} client
     */
    sendChatHistory(client) {
        this.redis.zrange("msgset", -10, -1, (err, msgs) => {
            if (err)
                console.log(err);
            const msgHistory = msgs.map(m => JSON.parse(m));
            client.send(JSON.stringify(msgHistory));
        });
    }
}
exports.default = ChatSocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb2NrZXRzL2NoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxnQ0FBK0I7QUFDL0IsZ0NBQStCO0FBQy9CLCtCQUE4QjtBQUU5QixzQkFBc0MsU0FBUSxTQUFTLENBQUMsTUFBTTtJQUE5RDs7UUFFSTs7V0FFRztRQUNILGdCQUFXLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUE7UUFDNUMsVUFBSyxHQUFzQixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFcEU7O1dBRUc7UUFDSCxXQUFNLEdBQUcsR0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBYSxFQUFFLEdBQXlCLEVBQUUsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUM1QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtnQkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDeEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ2xFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1lBQzNDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFBO1FBRUQ7Ozs7O1dBS0c7UUFDSCxtQkFBYyxHQUFHLENBQUMsSUFBWSxFQUFFLEdBQXlCLEVBQVEsRUFBRTtZQUMvRCxNQUFNLE9BQU8sR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLEdBQU0sSUFBSSxFQUFFLENB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