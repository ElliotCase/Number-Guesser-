/*
Game function:
- player must guess a number between a min and max
- player gets a certain amount of guesses
- notify play of guesses remaining
- notify the player of the correct answer if loose
- let player choose to play again
*/

// game values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max);
guessesLeft = 3;

// ui elements

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// listen for guess

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // check if won
  if (guess === winningNum) {
    // game  over - won

    gameOver(true, `${winningNum} is correct, YOU WIN`);
  } else {
    // WRONG NUMBER

    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // game over lost

      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // change border color
      guessInput.style.borderColor = "red";

      // clear input
      guessInput.value = "";
      // game continues - answer was wrong
      setMessage(
        `${guess} is not correct, you have ${guessesLeft} guesses left`,
        "red"
      );
    }
  }
});

// GAME OVER

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //disable input
  guessInput.disabled = true;

  // change border color
  guessInput.style.borderColor = color;

  // set Text Color
  message.style.color = color;
  // set message
  setMessage(msg);

  // play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
