const canvas = document.getElementById('jump');
const context = canvas.getContext('2d');
document.body.style.display="flex";
document.body.style.justifyContent="center";
// Variables
let score;
let scoreText;
let highscore;
let highscoreText;
let dino;
let gravity;
let objects = [];
let speedGame;
let keyPress = {};

// Event Listeners
document.addEventListener('keydown', function (event) {
    keyPress[event.code] = true;
    console.log(event.key)
  });
  document.addEventListener('keyup', function (event) {
    keyPress[event.code] = false;
  });

function drawDino(x,y,width,height,color){
    return{
        x:x,
        y:y,
        w:width,
        h:height,
        c:color,

        dy:0,
        jumpUp:12,
        originHeightDino:height,
        ground:false,
        jumpTime:0,
        update:function(){
            //jump condition 
            if (keyPress['ArrowUp'] || keyPress['Space'] || keyPress['KeyW'] ) {
                this.jump();
            } else {
            this.jumpTime = 0;
            }
        
            if (keyPress['ArrowDown']||keyPress['KeyS']) {
            this.h = this.originHeightDino / 2;
            } else {
            this.h = this.originHeightDino;
            }
        
            this.y += this.dy;
        
            // Gravity
            if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.ground = false;
            } else {
            this.dy = 0;
            this.ground = true;
            this.y = canvas.height - this.h;
            }
            this.draw();
        },
        jump:function(){
            if (this.ground && this.jumpTime == 0) {
                this.jumpTime = 1;
                this.dy = -this.jumpUp;
            } else if (this.jumpTime > 0 && this.jumpTime < 15) {
                this.jumpTime++;
                this.dy = -this.jumpUp - (this.jumpTime / 50);
            }
        },
        draw:function(){
            context.beginPath();
            context.fillStyle = this.c;
            context.fillRect(this.x, this.y, this.w, this.h);
            context.closePath();
        }
    }
}
function drawObjects(x,y,width,height,color){
    return{
        x:x,
        y:y,
        w:width,
        h:height,
        c:color,

        dx:-speedGame,
        update:function(){
            this.x += this.dx;
            this.draw();
            this.dx = -speedGame;
        },
        draw:function(){
            context.beginPath();
            context.fillStyle = this.c;
            context.fillRect(this.x, this.y, this.w, this.h);
            context.closePath();
        }
    }
}
function drawText(score,x,y,area,color,pixel){
    return{
        t:score,
        x:x,
        y:y,
        a:area,
        c:color,
        s:pixel,
        draw:function(){
            context.beginPath();
            context.fillStyle = this.c;
            context.font = this.s + "px sans-serif";
            context.textAlign = this.a;
            context.fillText(this.t, this.x, this.y);
            context.closePath();
        }
    }
}

//game condition
function respawnObjects(){
    let sizeObject = randomRange(20, 70);
    let typeObject = randomRange(0, 1);
    let object = drawObjects(canvas.width + sizeObject, canvas.height - sizeObject, sizeObject, sizeObject, '#C24641');
  
    if (typeObject == 1) {
      object.y -= dino.originHeightDino - 10;
    }
    objects.push(object);
}

//random function
function randomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function startGame(){
    canvas.width = 800;
    canvas.height = 500;
    
    context.font = "20px sans-serif";
  
    speedGame = 3;
    gravity = 1;
  
    score = 0;
    highscore = 0;
    if (localStorage.getItem('highscore')) {
      highscore = localStorage.getItem('highscore');
    }
  
    dino = drawDino(25, 0, 40, 40, '#FF8040');
  
    scoreText = drawText("Score: " + score, 25, 25, "left", "white", "20");
    highscoreText = drawText("Highscore: " + highscore, canvas.width - 25, 25, "right", "white", "20");
  
    requestAnimationFrame(updateGame);
}

let initialRespawnTimer = 200;
let RespawnTimer = initialRespawnTimer;
function updateGame(){
    requestAnimationFrame(updateGame);
  
    
    context.clearRect(0, 0, canvas.width, canvas.height);  
    context.beginPath();
    context.fillStyle='black';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.closePath();
      

    RespawnTimer--;
    if (RespawnTimer <= 0) {
      respawnObjects();
      console.log(objects);
      RespawnTimer = initialRespawnTimer - speedGame * 8;
      
      if (RespawnTimer < 60) {
        RespawnTimer = 60;
      }
    }
  
    // Spawn Enemies
    for (let i = 0; i < objects.length; i++) {
      let ob = objects[i];
  
      if (ob.x + ob.w < 0) {
        objects.splice(i, 1);
      }
  
      if (isCollision(dino,ob)) {
        objects = [];
        score = 0;
        RespawnTimer = initialRespawnTimer;
        speedGame = 3;
        window.localStorage.setItem('highscore', highscore);
      }
  
      ob.update();
    }
  
    dino.update();
  
    score++;
    scoreText.t = "Score: " + score;
    scoreText.draw();
  
    if (score > highscore) {
      highscore = score;
      highscoreText.t = "Highscore: " + highscore;
    }
    
    highscoreText.draw();
  
    speedGame += 0.003;
}
//global
function isCollision(dino,ob){
    return (dino.x < ob.x + ob.w &&
    dino.x + dino.w > ob.x &&
    dino.y < ob.y + ob.h &&
    dino.y + dino.h > ob.y);
}
startGame();