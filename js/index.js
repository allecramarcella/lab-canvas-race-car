const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const backgroundCanvas = document.getElementById('background-canvas')
const backgroundCtx = backgroundCanvas.getContext('2d')

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    loadBackground()
    player.createCar(ctx)
  }
};

function loadBackground() {
  const backgroundImg = new Image()
    backgroundImg.src = './images/road.png'

    backgroundImg.onload = function(){
      backgroundCtx.drawImage(backgroundImg, 0, 0, 500, 700)
    }
}

class Player {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speedX = speed
  }
  
  moveLeft(){
    if(this.x >= 30) {
      this.x -= this.speedX
    }
    updateCar()
  }

  moveRight(){
    if(this.x <= 670) {
      this.x += this.speedX
    }
  }

  createCar(ctx){
    const carImg = new Image()
    

    let initialX = this.x
    let initialY = this.y

    carImg.onload = function(){
      // console.log('test')
      ctx.drawImage(carImg, initialX, initialY, 50, 100)
    }
    carImg.src = './images/car.png'
    this.addListenersDown()
    this.addListenersUp()
  }

  addListenersDown() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          console.log('move left')
          this.moveLeft()
          console.log(this.x)
          break;
        case 'ArrowRight':
          console.log('move right')
          this.moveRight()
          break;
      }
    })
  }

  addListenersUp (){
    document.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          console.log('stop left')
          this.speedX = 0
          console.log(this.x)
          break;
        case 'ArrowRight':
          console.log('stop right')
          this.speedX = 0
          break;
      }
    })
  }
}

let player = new Player (225, 570, 10)

function clearRoad () {
  ctx.clearRect(0, 0, 500 , 700)
}

function updateCar() {
  // clearRoad()
  player.createCar(ctx)
  requestAnimationFrame(updateCar)
}













  


