window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  const game = {
    start: function() {


    const canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 600;
    const tennis = new Image();
    let racketX = 200;
    let racketY = 400;
    
    const racket = new Image();
    const racket2 = new Image();
    const ball = new Image();
    tennis.src = "images/tennis.png";
    racket.src = "images/racket.png";
    racket2.src= "images/racket.png"
    ball.src = "images/ball.png";
    tennis.onload = () => {
    this.ctx.drawImages(tennis,0,0);
    racket.onload = () => {
    this.ctx.drawImages(racket,0,0);
    racket2.onload = () => {
    this.ctx.drawImages(racket2,0,0);
    ball.onload = () => {
    this.ctx.drawImages(ball,0,0);
    this.tennis.update();
    this.racket.update();
    this.racket2.update();
    this.ball.update();
    document.onkeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
        this.racket.speedX -1;
        break;
        case "ArrowRight":
        this.racket2.speedX +1;
        break;
        default:
         break;
      }
    this.interval = setInterval(updateGame, 20);
    }
  }


  


clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    function startGame(){
     game.start();
        
    }
  
    }


  class Component {
    constructor(posX,posY,Width,height){
      this.posX = posX;
      this.postY = posY;
      this.width = width;
      this.height = height;
     }
     
     update() {
     }

     move() {
       this.posX += this.speedX;
       this.posY += this.speedY;
     }
    }
    class tennis extends Component {
      constructor(image){
        super(0,0,this.canvas.width,this.canvas.height);
        this.image image;
      }
      
      update() {
        this.move();
        game.context.drawImages(this.image,this.posX,this.posY, this.width,this.height);
      }



      }
    }