"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const ws_1 = require("ws");
const chat_1 = require("./sockets/chat");
const PORT = 3001;
/**
 * Initialize our Express http server
 * @return {IHttpServer} server
 */
const server = express()
    .use(morgan('dev'))
    .use('/public', express.static('./client/dist'))
    .listen(PORT, '0.0.0.0', () => {
    console.log(`Running Backend Server at http://0.0.0.0:${PORT}`);
});
/**
 * Initialize a new socket server instance and
 * pass it to the chatroom module
 */
const wss = new ws_1.Server({ server });
chat_1.chatRoomChannel(wss);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrQztBQUNsQyxpQ0FBZ0M7QUFDaEMsMkJBQTJDO0FBRTNDLHlDQUFnRDtBQUVoRCxNQUFNLElBQUksR0FBVyxJQUFJLENBQUE7QUFFekI7OztHQUdHO0FBQ0gsTUFBTSxNQUFNLEdBQWdCLE9BQU8sRUFBRTtLQUNoQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUMvQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUN2RSxDQUFDLENBQUMsQ0FBQTtBQUVGOzs7R0FHRztBQUNILE1BQU0sR0FBRyxHQUFrQixJQUFJLFdBQVksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDdkQsc0JBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQSJ9