const rollDise = document.getElementById("roll-dice");
const diceValue = document.getElementById("dice-value");

rollDise.addEventListener("click", () => {
  let random = Math.floor(Math.random() * 6 + 1);

  diceValue.innerHTML = random;
});

const socket = io();

const formUser = document.querySelector("#formUser");
const inputUser = document.querySelector("#inputUser");
const userContianer = document.querySelector("#userContainer");
const formDice = document.getElementById("form-dice");
const scores = document.getElementById("scores");

let myUser;

formUser.addEventListener("submit", function (e) {
  e.preventDefault();
  myUser = inputUser.value;
  userContianer.innerHTML = "<h2>Välkommen " + myUser + "</h2>";
  document.getElementById("user").style.display = "none";
});

formDice.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log();
  if (rollDise.value) {
    socket.emit("scoreList", { user: myUser, score: diceValue.value });
    diceValue.value = "";
  }
});

socket.on("newScoreList", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  scores.appendChild(item);
});
