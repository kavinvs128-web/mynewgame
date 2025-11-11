const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreText = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let isAlive = true;
let scoreInterval;

// Start scoring
function startScore() {
  scoreInterval = setInterval(() => {
    if (isAlive) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
    }
  }, 100);
}

// Jump function
function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    setTimeout(() => dino.classList.remove("jump"), 500);
  }
}

// Collision detection
function checkCollision() {
  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

  if (cactusLeft > 520 && cactusLeft < 580 && dinoBottom < 40 && isAlive) {
    gameOver();
  }
}

// Game over
function gameOver() {
  isAlive = false;
  clearInterval(scoreInterval);
  cactus.style.animation = "none";
  finalScoreText.textContent = `Your Score: ${score}`;
  gameOverScreen.classList.remove("hidden");
}

// Restart game
function restartGame() {
  location.reload(); // clean restart
}

// Event listeners
document.addEventListener("keydown", function (e) {
  if (e.code === "Space" || e.key === "ArrowUp") {
    jump();
  }
});

restartBtn.addEventListener("click", restartGame);

// Run game loop
startScore();
setInterval(checkCollision, 100);