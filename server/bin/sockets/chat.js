"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const uuid = require("uuid/v4");
class ChatSocketServer extends WebSocket.Server {
    constructor() {
        super(...arguments);
        /**
         * Map to store our user/colour combinations
         */
        this.userColours = new Map();
        /**
         * Socket event listeners
         */
        this.startListening = () => {
            this.on('connection', (ws, req) => {
                this.assignUniqueColour(req);
                this.broadcastUserCount();
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
            let message = JSON.parse(json);
            message.key = uuid();
            message.colour = this.userColours.get(req.socket.remoteAddress);
            this.broadcast(JSON.stringify(message));
        };
        /**
         * Helper method to broadcast messages to all connected socket clients
         * @param  {string} data
         */
        this.broadcast = (data) => {
            this.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
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
            this.broadcast(JSON.stringify(message));
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
}
exports.default = ChatSocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb2NrZXRzL2NoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxnQ0FBK0I7QUFDL0IsZ0NBQStCO0FBRy9CLHNCQUFzQyxTQUFRLFNBQVMsQ0FBQyxNQUFNO0lBQTlEOztRQUVJOztXQUVHO1FBQ0gsZ0JBQVcsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUU1Qzs7V0FFRztRQUNILG1CQUFjLEdBQUcsR0FBUyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBYSxFQUFFLEdBQXlCLEVBQUUsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUM1QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtnQkFDekIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ2xFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1lBQzNDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFBO1FBRUQ7Ozs7O1dBS0c7UUFDSCxtQkFBYyxHQUFHLENBQUMsSUFBWSxFQUFFLEdBQXlCLEVBQVEsRUFBRTtZQUMvRCxJQUFJLE9BQU8sR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLEdBQU0sSUFBSSxFQUFFLENBQUE7WUFDdkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBRS9ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQzNDLENBQUMsQ0FBQTtRQUVEOzs7V0FHRztRQUNILGNBQVMsR0FBRyxDQUFDLElBQVksRUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBaUIsRUFBRSxFQUFFO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNyQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUE7UUFFRDs7V0FFRztRQUNILHVCQUFrQixHQUFHLEdBQVMsRUFBRTtZQUM1QixNQUFNLE9BQU8sR0FBYSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtZQUMzQyxNQUFNLE9BQU8sR0FBYTtnQkFDdEIsSUFBSSxFQUFNLE9BQU87Z0JBQ2pCLE9BQU8sRUFBRyxPQUFPLENBQUMsUUFBUSxFQUFFO2FBQy9CLENBQUE7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUMzQyxDQUFDLENBQUE7UUFFRDs7Ozs7V0FLRztRQUNILHVCQUFrQixHQUFHLENBQUMsR0FBeUIsRUFBUSxFQUFFO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQ3hELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUV2QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM5RCxDQUFDO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUFBO0FBeEVELG1DQXdFQyJ9