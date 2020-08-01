// const canvas = document.getElementById('canvas')
// const ctx = canvas.getContext('2d')

const backgroundCanvas = document.getElementById('background-canvas')
const backgroundCtx = backgroundCanvas.getContext('2d')

const carImg = new Image()
carImg.src = './images/car.png'


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  function startGame() {
    loadBackground()
    gameArea.start()
  }
};

function loadBackground() {
  const backgroundImg = new Image()
    backgroundImg.src = './images/road.png'
    backgroundImg.onload = function(){
      backgroundCtx.drawImage(backgroundImg, 0, 0, 500, 700)
    }
}

const gameArea = {
    canvas: document.getElementById('canvas'),
    frames: 0,
    start: function () {
        this.ctx= this.canvas.getContext('2d')
        this.interval = setInterval(updateObstacles, 100)
        updateGameArea()
        
    },
    clear: function (){
        this.ctx.clearRect(0, 0, 500, 700)
    },
    stop: function (){
      clearInterval(this.interval)
    },
}

function updateGameArea (){
    gameArea.clear()
    player.update()
    drawScore()
    updateObstacles()
    crash(obstacles)
    requestAnimationFrame(updateGameArea)
}

class Player {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speedX = speed
  }
  
  update () {
    let initialX = this.x
    let initialY = this.y

    const ctx = canvas.getContext('2d')
    ctx.drawImage(carImg, initialX, initialY, 50, 100)
   }
  
  moveLeft(){
    if(this.x >= 60) {
      this.x -= this.speedX
    }
  }

  moveRight(){
    if(this.x <= 400) {
      this.x += this.speedX
    }
  } 
}

const player = new Player (225, 570, 10)


document.addEventListener('keydown', (e) => {
    switch(e.key) {
    case 'ArrowLeft':
        player.moveLeft()
        break;
    case 'ArrowRight':
        player.moveRight()
        break;
    }
})

class Obstacle {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
    }

    update() {
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
}

const obstacles = []

function updateObstacles() {
    gameArea.frames += 1;
    if (gameArea.frames % 250 === 0) {
      let x = 60 + (Math.random() * 280)
      let minWidth = 100;
      let maxWidth = 150;
      let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      obstacles.push(new Obstacle(width, 15, 'red', x, 0));
    }

    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 1;
        obstacles[i].update();
      }
}

function crash(obstacles) {
  console.log('yes, i have been called')
  obstacles.forEach((obstacle, index) => {
    const distanceX = (obstacle.y + 15) - (player.y + 100)
    
    if(distanceX > -100) {
      obstacles.splice(index, 1)
      updateScore()
    }
  
  })
}

function updateScore() {
  let score = 0
  let count = 1
  score += count
}

function drawScore() {
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'black'
  ctx.font = '30px Arial'
  ctx.fillText(`Score: ${updateScore()}`, 10, 25)
}


















  


