System.register("app", ["express", "ws"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, ws_1, PORT, server, wss;
    return {
        setters: [
            function (express_1) {
                express = express_1;
            },
            function (ws_1_1) {
                ws_1 = ws_1_1;
            }
        ],
        execute: function () {
            PORT = 3001;
            server = express()
                .use('/public', express.static('./client/dist'))
                .listen(PORT, '0.0.0.0', () => {
                console.log(`listening on ${PORT}`);
            });
            wss = new ws_1.Server({ server });
            wss.on('connection', (ws) => {
                console.log('Client connected');
                ws.on('close', () => console.log('Client disconnected'));
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUdNLElBQUksR0FBRyxJQUFJLENBQUE7WUFFWCxNQUFNLEdBQUcsT0FBTyxFQUFFO2lCQUNuQixHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBRS9DLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN2QyxDQUFDLENBQUMsQ0FBQTtZQUVJLEdBQUcsR0FBRyxJQUFJLFdBQVksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFFeEMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUVoQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsQ0FBQTtRQUNGLENBQUMifQ==