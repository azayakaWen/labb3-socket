const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`A client with id ${socket.id} connected to play!`);

  socket.on("scoreList", (msg) => {
    console.log("Score: " + msg.user + " " + msg.score);
    io.emit("newScoreList", msg.user + " : " + msg.score);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
