"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const chat_1 = require("./sockets/chat");
const PORT = 3001;
/**
 * Initialize our Express http server
 * @return {http.Server} server
 */
const server = express()
    .use(morgan('dev'))
    .use('/public', express.static('./client/dist'))
    .listen(PORT, '0.0.0.0', () => {
    console.log(`Running Backend Server at http://0.0.0.0:${PORT}`);
});
/**
 * Initialize a new socket server instance
 */
new chat_1.default({ server }).listen();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrQztBQUNsQyxpQ0FBZ0M7QUFFaEMseUNBQTZDO0FBRTdDLE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQTtBQUV6Qjs7O0dBR0c7QUFDSCxNQUFNLE1BQU0sR0FBZ0IsT0FBTyxFQUFFO0tBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQy9DLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZFLENBQUMsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDSCxJQUFJLGNBQWdCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBIn0=