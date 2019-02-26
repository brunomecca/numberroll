var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

const editScene = require("./editscene");

app.use(express.static(__dirname + "/out"));
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "out/index.html");
});

const scene = require("./scene");

let id = 0;
const players = [];
const clients = [];

io.on("connection", client => {
    console.log("Client connected...");
    clients.push(client);
    client.on("join", data => {
        players.push([0, 0]);
        client.emit("scene", [scene, id]);
        id++;
    });

    client.on("keydown", data => {
        // data[1] = playerId
        // players[data[1]][0]++;

        let number = editScene.getRandomInt(0, 9);

        for (let array of scene) {
            for (let i = 0; i < array.length; i++) {
                array[i] = number;
                
            }
        }

        let x = players[data[1]][0];
        let y = players[data[1]][1];
        scene[x][y] = 0;

        if (data[0] == 68) players[data[1]][1]++;
        else if (data[0] == 65) players[data[1]][1]--;
        else if (data[0] == 87) players[data[1]][0]--;
        else if (data[0] == 83) players[data[1]][0]++;

        x = players[data[1]][0];
        y = players[data[1]][1];

        for (let i of [x, y]) {
            if (i < 0) i = 0;
            if (i >= scene[0].length) i = scene[0].length - 1;
        }
        scene[x][y] = 1;

        let color = editScene.getRandomColor();

        for (let cl of clients) cl.emit("scene", [scene, undefined, color]);
    });
});

server.listen(3000, function() {
    console.log("listening on *:3000");
});
