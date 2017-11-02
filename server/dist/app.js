"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const chat_1 = require("./sockets/chat");
const PORT = Number(process.env.PORT) || 3001;
/**
 * Initialize our Express http server
 * @return {http.Server} server
 */
const app = express();
app.use(morgan('dev'));
app.use('/public', express.static('./client/dist'));
app.get('/', (req, res) => {
    console.log('test');
    res.sendFile(path.join(__dirname + './../../index.html'));
});
const server = app.listen(PORT, () => {
    console.log(`Running Backend Server at http://0.0.0.0:${PORT}`);
});
/**
 * Initialize a new socket server instance
 */
new chat_1.default({ server }).listen();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrQztBQUNsQyxpQ0FBZ0M7QUFFaEMsNkJBQTRCO0FBQzVCLHlDQUE2QztBQUU3QyxNQUFNLElBQUksR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUE7QUFFckQ7OztHQUdHO0FBQ0gsTUFBTSxHQUFHLEdBQVEsT0FBTyxFQUFFLENBQUE7QUFFMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7QUFFbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7SUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNuQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUMsQ0FBQTtBQUdGLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZFLENBQUMsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDSCxJQUFJLGNBQWdCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBIn0=