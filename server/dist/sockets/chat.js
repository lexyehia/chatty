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
        this.listen = () => {
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
            const message = JSON.parse(json);
            message.key = uuid();
            message.colour = this.userColours.get(req.socket.remoteAddress);
            this.broadcast(message);
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
}
exports.default = ChatSocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb2NrZXRzL2NoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxnQ0FBK0I7QUFDL0IsZ0NBQStCO0FBRy9CLHNCQUFzQyxTQUFRLFNBQVMsQ0FBQyxNQUFNO0lBQTlEOztRQUVJOztXQUVHO1FBQ0gsZ0JBQVcsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUU1Qzs7V0FFRztRQUNILFdBQU0sR0FBRyxHQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFhLEVBQUUsR0FBeUIsRUFBRSxFQUFFO2dCQUMvRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO2dCQUN6QixFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDbEUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFDM0MsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUE7UUFFRDs7Ozs7V0FLRztRQUNILG1CQUFjLEdBQUcsQ0FBQyxJQUFZLEVBQUUsR0FBeUIsRUFBUSxFQUFFO1lBQy9ELE1BQU0sT0FBTyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDMUMsT0FBTyxDQUFDLEdBQUcsR0FBTSxJQUFJLEVBQUUsQ0FBQTtZQUN2QixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7WUFFL0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMzQixDQUFDLENBQUE7UUFFRDs7O1dBR0c7UUFDSCxjQUFTLEdBQUcsQ0FBQyxJQUFZLEVBQVEsRUFBRTtZQUMvQixNQUFNLFFBQVEsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRTdDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBaUIsRUFBRSxFQUFFO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN6QixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUE7UUFFRDs7V0FFRztRQUNILHVCQUFrQixHQUFHLEdBQVMsRUFBRTtZQUM1QixNQUFNLE9BQU8sR0FBYSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtZQUMzQyxNQUFNLE9BQU8sR0FBYTtnQkFDdEIsSUFBSSxFQUFNLE9BQU87Z0JBQ2pCLE9BQU8sRUFBRyxPQUFPLENBQUMsUUFBUSxFQUFFO2FBQy9CLENBQUE7WUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzNCLENBQUMsQ0FBQTtRQUVEOzs7OztXQUtHO1FBQ0gsdUJBQWtCLEdBQUcsQ0FBQyxHQUF5QixFQUFRLEVBQUU7WUFDckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDeEQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBRXZDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzlELENBQUM7UUFDTCxDQUFDLENBQUE7SUFDTCxDQUFDO0NBQUE7QUExRUQsbUNBMEVDIn0=