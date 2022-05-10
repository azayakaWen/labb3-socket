const socket = io();

const rollDise = document.getElementById("roll-dice");
const diceValue = document.getElementById("dice-value");

rollDise.addEventListener("click", () => {
  let random = Math.floor(Math.random() * 6 + 1);

  diceValue.innerHTML = random;
});
