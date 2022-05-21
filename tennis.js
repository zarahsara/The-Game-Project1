const canvas = document.getElementById("tennis");
const ctx = canvas.getContext('2d');

let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";


// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 4,
    velocityY : 4,
    speed : 2,
    color : "yellow"
}

// player racket
const user = {
    x : 0, 
    y : (canvas.height - 100)/2, 
    width : 7,
    height : 100,
    score : 0,
    color : "drakpink"
}

// COM racket
const com = {
    x : canvas.width - 10, 
    y : (canvas.height - 100)/2, 
    width : 7,
    height : 100,
    score : 0,
    color : "darkpink"
}

// NET is draw
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 1,
    width : 2,
    color : "blue"
}

// draw a rectangle, will be used to draw racket
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// listening to the mouse
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
}

// when COM or player scores, we reset the ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 2;
}

// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=12){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// update function, the function that does all calculations
function update(){
    
    // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    
  
if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();

        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    
   
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        wall.play();
    }
    
  
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
 
    if(collision(ball,player)){
       
        hit.play();
      
        let collidePoint = (ball.y - (player.y + player.height/2));
        
        collidePoint = collidePoint / (player.height/2);
        
    
        let angleRad = (Math.PI/4) * collidePoint;
        
      
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // speed up the ball everytime a racket hits it.
        ball.speed += 0.1;
    }
}


function render(){
    
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#dec8ab");
    
    // draw the user score to the left
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    // draw the COM score to the right
    drawText(com.score,3*canvas.width/4,canvas.height/5);
    
    // draw the net
    drawNet();
    
    // draw the player racket
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's racket
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
// number of frames per second
let framePerSecond = 0;


let loop = setInterval(game,1000/framePerSecond);


    
 