const socket = io();

const formUser = document.querySelector("#formUser");
const inputUser = document.querySelector("#inputUser");
const messages = document.querySelector("#messages");
const formMessage = document.querySelector("#formMessage");
const inputMessage = document.querySelector("#inputMessage");
const userContianer = document.querySelector("#userContainer");
const rollDice = document.getElementById("roll-dice");
const diceValue = document.getElementById("dice-value");
const formDice = document.getElementById("form-dice");
const scores = document.getElementById("scores");

//Användarnamn
let myUser;
//Totala summan för kast
let total = 0;

//Visa spel och chat efter namn
formUser.addEventListener("submit", function (e) {
  e.preventDefault();
  myUser = inputUser.value;
  userContianer.innerHTML = "<h2>Välkommen " + myUser + "</h2>";
  document.getElementById("user").style.display = "none";
  document.getElementById("message").style.display = "block";
  document.getElementById("chat").style.display = "block";
  document.getElementById("dice").style.display = "block";
  document.getElementById("instructions").style.display = "block";
});

//Info för chat
formMessage.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log();
  if (inputMessage.value) {
    socket.emit("chatMessage", { user: myUser, message: inputMessage.value });
    inputMessage.value = "";
  }
});

socket.on("newChatMessage", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
});

//Tärningskast
formDice.addEventListener("click", (e) => {
  e.preventDefault();
  if (rollDice.value) {
    socket.emit("scoreList", { user: myUser, dice: rollDice.value });
    rollDice.value = "";
  }
});

socket.on("newScoreList", (score) => {
  let item = document.createElement("li");
  item.textContent = score;
  scores.appendChild(item);
});

rollDice.addEventListener("click", () => {
  let random = Math.floor(Math.random() * 6 + 1);

  total = total + random;

  diceValue.innerHTML = random;

  socket.emit("rollDice", {
    name: myUser,
    diceValue: random,
    diceTotal: total,
  });
});

/*if (total > 50) {
    Swal.fire(`${myUser} vann!
    GRATTIS!`);
    setTimeout(function () {
      location.reload();
    }, 3000);
  }*/
