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
        this.interval = setInterval(updateObstacles, 20)
        updateGameArea()
    },
    clear: function (){
        this.ctx.clearRect(player.x - 25, player.y, player.x + 50, 100)
    },
}

function updateGameArea (){
    gameArea.clear()
    player.update()
    updateObstacles()
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

    // carImg.onload = function(){
        const ctx = canvas.getContext('2d')
        ctx.drawImage(carImg, initialX, initialY, 50, 100)
  //   }
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
    //   this.speedX = 0;
    //   this.speedY = 0;
    }

    update() {
        const ctx = canvas.getContext('2d')
        // ctx.clearRect(this.x, this.y, 200, 50)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

//   newPos() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//   }
}

const obstacles = []

function updateObstacles() {
    
    gameArea.frames += 1;
    if (gameArea.frames % 80 === 0) {
      let x = 60 + (Math.random() * 170)
      let minWidth = 50;
      let maxWidth = 150;
      let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      // let minGap = 0;
      // let maxGap = 250;
      // let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      obstacles.push(new Obstacle(width, 10, 'red', x, 0));
      // obstacles.push(new Obstacle(width, 10, 'blue', x + gap, 0));
      // obstacles.push(new Obstacle(x- width -gap, 10, 'pink', x, height + gap));
    //   obstacles.push(new Obstacle(100, 15, 'yellow', 50, 0))
    }

    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].y -= -1;
        obstacles[i].update();
      }
  }


  


















  


