const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = 3000;

//MongoDB chat
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db;

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    db = client.db("dicegame");
    messages = db.collection("messages");
    dice = db.collection("dice");
  }
);

app.use(express.static("public"));

//Messages
app.get("/messages", (req, res) => {
  messages.find().toArray((err, items) => {
    if (err) throw err;
    res.json({ messages: items });
  });
});

//Dice
app.get("/dice", (req, res) => {
  dice.find().toArray((err, items) => {
    if (err) throw err;
    res.json({ value: items });
  });
});

//Chat
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} is ready to play!`);

  socket.on("chatMessage", (msg) => {
    console.log("Meddelande: " + msg.user + " " + msg.message);
    io.emit("newChatMessage", msg.user + " : " + msg.message);

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    //Chat för MongoDB
    messages.insertOne(
      {
        user: msg.user,
        message: msg.message,
        date: dateTime,
      },
      (err, result) => {
        if (err) throw err;
        console.log(result);
      }
    );
  });

  //Tärningen
  socket.on("rollDice", (value) => {
    io.emit(
      "newScoreList",
      value.name +
        ": Senaste kastet: " +
        value.diceValue +
        ", Totalen: " +
        value.diceTotal
    );

    //Tärning för MongoDB
    dice.insertOne(
      {
        name: value.name,
        diceValue: value.diceValue,
        total: value.diceTotal,
      },
      (err, result) => {
        if (err) throw err;
        console.log(result);
      }
    );
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} is a bad loser!`);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
