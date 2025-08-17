// ===== Snake Game =====

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Size of each grid cell
const canvasSize = canvas.width; // Square canvas
let snake, direction, food, score, highScore, speed, game;

// ===== Initialization =====
function initGame() {
  snake = [{ x: 9 * box, y: 9 * box }]; // start at center
  direction = "RIGHT";
  score = 0;
  speed = 150; // initial speed in ms
  food = randomFood();

  highScore = localStorage.getItem("snakeHighScore") || 0;
  document.getElementById("highscore").innerText = "High Score: " + highScore;

  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("gameOverScreen").classList.add("hidden");

  if (game) clearInterval(game);
  game = setInterval(gameLoop, speed);
}

// ===== Food Position =====
function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
  };
}

// ===== Drawing functions =====
function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "darkgreen" : "limegreen";
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = "#111";
    ctx.strokeRect(segment.x, segment.y, box, box);
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2 - 2, 0, 2 * Math.PI);
  ctx.fill();
}

// ===== Movement & Mechanics =====
function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  snake.unshift(head);

  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;

    // Level up: Increase speed after every 5 points
    if (score % 5 === 0 && speed > 60) {
      speed -= 10;
      clearInterval(game);
      game = setInterval(gameLoop, speed);
    }

    food = randomFood();
  } else {
    // remove tail
    snake.pop();
  }
}

// ===== Collision detection =====
function checkCollision() {
  const head = snake[0];

  // Check walls
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvasSize ||
    head.y >= canvasSize
  ) {
    return true;
  }

  // Check self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// ===== Game Loop =====
function gameLoop() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  moveSnake();
  if (checkCollision()) {
    return gameOver();
  }

  drawSnake();
  drawFood();
}

// ===== Game Over =====
function gameOver() {
  clearInterval(game);
  document.getElementById("gameOverScreen").classList.remove("hidden");

  // Save high score
  if (score > highScore) {
    localStorage.setItem("snakeHighScore", score);
    document.getElementById("highscore").innerText = "High Score: " + score;
  }
}

// ===== Controls =====
document.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowLeft" || e.key.toLowerCase() === "a") && direction !== "RIGHT") {
    direction = "LEFT";
  }
  if ((e.key === "ArrowUp" || e.key.toLowerCase() === "w") && direction !== "DOWN") {
    direction = "UP";
  }
  if ((e.key === "ArrowRight" || e.key.toLowerCase() === "d") && direction !== "LEFT") {
    direction = "RIGHT";
  }
  if ((e.key === "ArrowDown" || e.key.toLowerCase() === "s") && direction !== "UP") {
    direction = "DOWN";
  }

  // Restart on space if game over
  if (e.code === "Space" && document.getElementById("gameOverScreen").classList.contains("hidden") === false) {
    initGame();
  }
});

// Restart button
document.getElementById("restartBtn").addEventListener("click", initGame);

// Start game on load
initGame();
