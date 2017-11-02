"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chat_1 = require("./sockets/chat");
const PORT = Number(process.env.PORT) || 3001;
/**
 * Initialize our Express http server
 * @return {http.Server} server
 */
const app = express();
app.use('/public', express.static('./client/dist'));
app.get('/', (req, res) => {
    res.redirect('/public/index.html');
});
const server = app.listen(PORT, () => {
    console.log(`Running Backend Server at http://0.0.0.0:${PORT}`);
});
/**
 * Initialize a new socket server instance
 */
new chat_1.default({ server }).listen();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrQztBQUdsQyx5Q0FBNkM7QUFFN0MsTUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFBO0FBRXJEOzs7R0FHRztBQUNILE1BQU0sR0FBRyxHQUFRLE9BQU8sRUFBRSxDQUFBO0FBRTFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtBQUVuRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRTtJQUNoQyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUE7QUFDdEMsQ0FBQyxDQUFDLENBQUE7QUFHRixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUN2RSxDQUFDLENBQUMsQ0FBQTtBQUVGOztHQUVHO0FBQ0gsSUFBSSxjQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQSJ9