import http from 'http';
import WebSocket, {
    WebSocketServer
} from 'ws';
import express from "express";
import {
    json
} from 'express/lib/response';

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (r_, res) => {
    res.render("home")
});

app.get("/*", (_, res) => {
    res.redirect("/")
});

const handleListener = () => console.log("Now Listening on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocketServer({
    server
});

const sockets = []

wss.on('connection', (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous"
    console.log('connected to backend')
    socket.on('message', (message) => {
        const parsedChat = JSON.parse(message);
        switch (parsedChat.type) {
            case "new_message":
                sockets.forEach((asocket) => {
                    asocket.send(`${socket.nickname}: ${parsedChat.payload.toString('utf-8')}`)
                })
            case "nickname":
                socket["nickname"] = parsedChat.payload;
                break
        }
    })
})

server.listen(3000, handleListener);