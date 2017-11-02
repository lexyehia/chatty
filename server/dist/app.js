"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const chat_1 = require("./sockets/chat");
const PORT = Number(process.env.PORT) || 3001;
/**
 * Initialize our Express http server
 * @return {http.Server} server
 */
const app = express();
app.use('/public', express.static('./client/dist'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../index.html'));
});
const server = app.listen(PORT, () => {
    console.log(`Running Backend Server at http://0.0.0.0:${PORT}`);
});
/**
 * Initialize a new socket server instance
 */
new chat_1.default({ server }).listen();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrQztBQUVsQyw2QkFBNEI7QUFDNUIseUNBQTZDO0FBRTdDLE1BQU0sSUFBSSxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQTtBQUVyRDs7O0dBR0c7QUFDSCxNQUFNLEdBQUcsR0FBUSxPQUFPLEVBQUUsQ0FBQTtBQUUxQixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7QUFFbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7SUFDaEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQyxDQUFDLENBQUE7QUFHRixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUN2RSxDQUFDLENBQUMsQ0FBQTtBQUVGOztHQUVHO0FBQ0gsSUFBSSxjQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQSJ9