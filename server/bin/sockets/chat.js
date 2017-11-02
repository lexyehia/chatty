"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const uuid = require("uuid/v4");
function chatRoomChannel(wss) {
    /**
     * Map to store our user/colour combinations
     */
    const userColours = new Map();
    /**
     * Socket event listeners
     */
    wss.on('connection', (ws, req) => {
        assignUniqueColour(req);
        broadcastUserCount();
        ws.on('message', (data) => processMessage(data, req));
        ws.on('close', broadcastUserCount);
    });
    /**
     * Helper method to broadcast messages to all connected socket clients
     * @param  {string} data
     */
    wss.broadcast = (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };
    /**
     * Process incoming messages, assigning them unique IDs and a colour
     * from the userColours Map
     * @param  {string} json incoming message
     * @param  {http.IncomingMessage} req
     */
    const processMessage = (json, req) => {
        let message = JSON.parse(json);
        message.key = uuid();
        message.colour = userColours.get(req.socket.remoteAddress);
        wss.broadcast(JSON.stringify(message));
    };
    /**
     * Send the count of connected socket clients to everyone
     */
    const broadcastUserCount = () => {
        const clients = wss.clients.size;
        const message = {
            type: "count",
            content: clients.toString()
        };
        wss.broadcast(JSON.stringify(message));
    };
    /**
     * For each connection, see whether that IP address is already stored
     * in userColours Map, if not then store it and assign a random colour
     * from an array of four
     * @param  {http.IncomingMessage}
     */
    const assignUniqueColour = (req) => {
        if (!userColours.has(req.socket.remoteAddress)) {
            const colours = ["00C5CD", "5959AB", "660000", "C48E48"];
            const i = Math.floor(Math.random() * 4);
            userColours.set(req.socket.remoteAddress, colours[i]);
        }
    };
}
exports.chatRoomChannel = chatRoomChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb2NrZXRzL2NoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxnQ0FBK0I7QUFDL0IsZ0NBQStCO0FBRS9CLHlCQUFnQyxHQUFrQjtJQUU5Qzs7T0FFRztJQUNILE1BQU0sV0FBVyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFBO0lBRWxEOztPQUVHO0lBQ0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFhLEVBQUUsR0FBeUIsRUFBRSxFQUFFO1FBQzlELGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZCLGtCQUFrQixFQUFFLENBQUE7UUFDcEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUM3RCxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0lBQ3RDLENBQUMsQ0FBQyxDQUFBO0lBRUY7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQVksRUFBUSxFQUFFO1FBQ25DLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBaUIsRUFBRSxFQUFFO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDckIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLGNBQWMsR0FBRyxDQUFDLElBQVksRUFBRSxHQUF5QixFQUFFLEVBQUU7UUFDL0QsSUFBSSxPQUFPLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QyxPQUFPLENBQUMsR0FBRyxHQUFNLElBQUksRUFBRSxDQUFBO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBRTFELEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQzFDLENBQUMsQ0FBQTtJQUVEOztPQUVHO0lBQ0gsTUFBTSxrQkFBa0IsR0FBRyxHQUFTLEVBQUU7UUFDbEMsTUFBTSxPQUFPLEdBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDMUMsTUFBTSxPQUFPLEdBQWE7WUFDdEIsSUFBSSxFQUFNLE9BQU87WUFDakIsT0FBTyxFQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQTtRQUVELEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQzFDLENBQUMsQ0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQXlCLEVBQVEsRUFBRTtRQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUN4RCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2QyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pELENBQUM7SUFDTCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBckVELDBDQXFFQyJ9