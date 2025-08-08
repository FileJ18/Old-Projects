const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let velocity = { x: 0, y: 0 };
let gameOver = false;
let lastGamepadTime = 0;

function draw() {
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 120, 200);
    return;
  }

  // Move snake
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop(); // remove tail
  }

  // Collision detection
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.slice(1).some(s => s.x === head.x && s.y === head.y)
  ) {
    gameOver = true;
  }

  // Draw background
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#0f0";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function gameLoop() {
  draw();
  pollGamepad(); // Check for gamepad input
  setTimeout(gameLoop, 100);
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": if (velocity.y === 0) velocity = { x: 0, y: -1 }; break;
    case "ArrowDown": if (velocity.y === 0) velocity = { x: 0, y: 1 }; break;
    case "ArrowLeft": if (velocity.x === 0) velocity = { x: -1, y: 0 }; break;
    case "ArrowRight": if (velocity.x === 0) velocity = { x: 1, y: 0 }; break;
  }
});

// Gamepad input
function pollGamepad() {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

  if (!gamepads) return;

  const gp = gamepads[0];
  if (!gp) return;

  const now = performance.now();

  // Only process every 150ms to prevent over-triggering
  if (now - lastGamepadTime < 150) return;

  const up = gp.buttons[12]?.pressed; // D-pad Up
  const down = gp.buttons[13]?.pressed; // D-pad Down
  const left = gp.buttons[14]?.pressed; // D-pad Left
  const right = gp.buttons[15]?.pressed; // D-pad Right

  if (up && velocity.y === 0) {
    velocity = { x: 0, y: -1 };
    lastGamepadTime = now;
  } else if (down && velocity.y === 0) {
    velocity = { x: 0, y: 1 };
    lastGamepadTime = now;
  } else if (left && velocity.x === 0) {
    velocity = { x: -1, y: 0 };
    lastGamepadTime = now;
  } else if (right && velocity.x === 0) {
    velocity = { x: 1, y: 0 };
    lastGamepadTime = now;
  }

  // Optional: add analog stick support
  const lx = gp.axes[0];
  const ly = gp.axes[1];

  if (lx < -0.5 && velocity.x === 0) {
    velocity = { x: -1, y: 0 };
    lastGamepadTime = now;
  } else if (lx > 0.5 && velocity.x === 0) {
    velocity = { x: 1, y: 0 };
    lastGamepadTime = now;
  } else if (ly < -0.5 && velocity.y === 0) {
    velocity = { x: 0, y: -1 };
    lastGamepadTime = now;
  } else if (ly > 0.5 && velocity.y === 0) {
    velocity = { x: 0, y: 1 };
    lastGamepadTime = now;
  }
}

gameLoop();
