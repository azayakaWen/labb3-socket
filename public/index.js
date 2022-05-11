const socket = io();

const rollDice = document.getElementById("roll-dice");
const diceValue = document.getElementById("dice-value");
const formDice = document.getElementById("form-dice");
const scores = document.getElementById("scores");

const formUser = document.querySelector("#formUser");
const inputUser = document.querySelector("#inputUser");
const userContianer = document.querySelector("#userContainer");

let myUser;

formUser.addEventListener("submit", function (e) {
  e.preventDefault();
  myUser = inputUser.value;
  userContianer.innerHTML = "<h2>Välkommen " + myUser + "</h2>";
  document.getElementById("user").style.display = "none";
});

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
  socket.emit("rollDice", { name: myUser, diceValue: random });
  diceValue.innerHTML = random;
});
