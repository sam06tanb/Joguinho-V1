const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

let isJumping = false;
let gameIsOver = false;
let loop;

const jump = () => {
  if (!isJumping && !gameIsOver) {
    isJumping = true;
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
      if (jumpCount < 15) {
        mario.style.bottom = `${marioPosition + 15}px`;
      } else if (jumpCount >= 15 && jumpCount < 30) {
        mario.style.bottom = `${marioPosition - 15}px`;
      } else {
        clearInterval(jumpInterval);
        isJumping = false;
      }
      jumpCount++;
    }, 10);
  }
};

const checkCollision = () => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 140 && pipePosition > 0 && marioPosition <= 50) {
 
    gameIsOver = true;
    clearInterval(loop);
    mario.src = './images/morte.png';
    mario.style.width = '150px';
    mario.style.marginLeft = '50px';
    setTimeout(() => {
      resetGame();
    }, 2000); 
  }
};

const resetGame = () => {
  
  gameIsOver = false;
  mario.src = './images/andar1-unscreen.gif'; 
  mario.style.width = '150px';
  mario.style.marginLeft = '0';
  loop = setInterval(gameLoop, 10);
};

const gameLoop = () => {
  checkCollision();
};

loop = setInterval(gameLoop, 10);

document.addEventListener('keydown', jump);
