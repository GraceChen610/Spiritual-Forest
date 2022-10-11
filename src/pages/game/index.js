/* eslint-disable no-use-before-define */
/* eslint-disable func-names */

const Game = () => {
// Create the canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1500;
  canvas.height = 300;
  canvas.style.backgroundColor = 'Green';
  document.body.appendChild(canvas);

  // Background image
  let bgReady = false;
  const bgImage = new Image();
  bgImage.onload = function () {
    bgReady = true;
  };
  bgImage.src = '/img/155.jpg';

  // Hero image
  let heroReady = false;
  const heroImage = new Image();
  heroImage.onload = function () {
    heroReady = true;
  };
  heroImage.src = 'img/cat-1.png';

  // Monster image
  let monsterReady = false;
  const monsterImage = new Image();
  monsterImage.onload = function () {
    monsterReady = true;
  };
  monsterImage.src = 'img/wool-ball.png';

  // Game objects
  const hero = {
    speed: 256, // movement in pixels per second
  };
  const monster = {};
  // var monstersCaught = 0;
  // 存儲玩家捕獲的怪物數量。

  // Handle keyboard controls
  const keysDown = {};

  window.addEventListener(
    'keydown',
    (e) => {
      keysDown[e.code] = true;
    },
    false,
  );

  window.addEventListener(
    'keyup',
    (e) => {
      delete keysDown[e.code];
    },
    false,
  );

  // Reset the game when the player catches a monster
  const reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.height - 64);
  };

  // Update game objects
  const update = function (modifier) {
    if ('ArrowUp' in keysDown) {
    // Player holding up
      hero.y -= hero.speed * modifier;
    }
    if ('ArrowDown' in keysDown) {
    // Player holding down
      hero.y += hero.speed * modifier;
    }
    if ('ArrowLeft' in keysDown) {
    // Player holding left
      hero.x -= hero.speed * modifier;
    }
    if ('ArrowRight' in keysDown) {
    // Player holding right
      hero.x += hero.speed * modifier;
    }

    // Are they touching?
    if (
      hero.x <= monster.x + 32
    && monster.x <= hero.x + 32
    && hero.y <= monster.y + 32
    && monster.y <= hero.y + 32
    ) {
    // ++monstersCaught;
      reset();
    }
  };

  // Draw everything
  const render = function () {
    if (bgReady) {
      ctx.drawImage(bgImage, 0, -730);
    }

    if (heroReady) {
      ctx.drawImage(heroImage, hero.x, hero.y, 40, 35);
    }

    if (monsterReady) {
      ctx.drawImage(monsterImage, monster.x, monster.y, 32, 32);
    }

  // // Score
  // ctx.fillStyle = "rgb(250, 250, 250)";
  // ctx.font = "24px Helvetica";
  // ctx.textAlign = "left";
  // ctx.textBaseline = "top";
  // ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
  };

  // The main game loop
  const main = function () {
    const now = Date.now();
    const delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
  };
    // Cross-browser support for requestAnimationFrame
  const w = window;
  let requestAnimationFrame = w.requestAnimationFrame
|| w.webkitRequestAnimationFrame
|| w.msRequestAnimationFrame
|| w.mozRequestAnimationFrame;

  // Let's play this game!
  let then = Date.now();
  reset();
  main();
};

export default Game;
