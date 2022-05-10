document.getElementById("roll-dice").onclick = diceRoll;

function diceRoll() {
  let randomValue = Math.floor(Math.random() * 6 + 1);

  document.getElementById("first-die").className = "dice-" + randomValue;

  document.getElementById("dice_total").innerHTML = randomValue;
}
