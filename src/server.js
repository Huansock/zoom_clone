import http from "http";
import SocketIo from "socket.io";
import express from "express";
import { json } from "express/lib/response";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

// route
app.get("/", (r_, res) => {
  res.render("home");
});
app.get("/*", (_, res) => {
  res.redirect("/");
});
//code
const server = http.createServer(app);
const io = SocketIo(server);

//socket.io 어댑터를 이용해봅시다
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

io.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  socket.on("enter_room", (roomName, nickname, showRoom) => {
    socket["nickname"] = nickname;
    socket.join(roomName);
    io.socket.emit("roomChange", publicRooms());
    showRoom();
    socket.to(roomName).emit("welcomeDrink", socket.nickname);
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("byeDrink", socket.nickname);
    });
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit(`new_message`, `${socket.nickname}: ${msg}`);
    done();
  });
});

// const wss = new WebSocketServer({
//     server
// });

// const sockets = []

// wss.on('connection', (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anonymous"
//     console.log('connected to backend')
//     socket.on('message', (message) => {
//         const parsedChat = JSON.parse(message);
//         switch (parsedChat.type) {
//             case "new_message":
//                 sockets.forEach((asocket) => {
//                     asocket.send(`${socket.nickname}: ${parsedChat.payload.toString('utf-8')}`)
//                 })
//             case "nickname":
//                 socket["nickname"] = parsedChat.payload;
//                 break
//         }
//     })
// })

server.listen(3000, () =>
  console.log("Now Listening on http://localhost:3000")
);
