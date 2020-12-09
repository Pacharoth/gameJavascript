//movement check
let moveUp=false,moveDown=false,moveLeft=false,moveRight=false;


//Game start
function startGame(){
    
    myGameArea.start(); 
    controlGame();
}
//create the area of the game
// we dont use css because it will damage the picture
let myGameArea = {
    canvas:document.createElement("canvas"),
    buttonStart:document.createElement("button"),
    start:function(){
        //the area of game play
        this.canvas.tabindex="1";
        this.canvas.id="hey";
        this.canvas.width = 800
        this.canvas.height= 600;
        this.canvas.style.border="1px solid black";
        this.canvas.style.margin = "auto";
        this.canvas.style.display = "block";
        this.context = this.canvas.getContext('2d');
        this.buttonStartGame();
        //insert to body 
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        console.log(document.body.innerHTML);
    },
    buttonStartGame:function(){
        this.buttonStart.innerHTML = "Start Game";
        let buttonStyle = this.buttonStart.style;
        buttonStyle.margin ="auto";
        buttonStyle.display="block";
        buttonStyle.marginTop="1%";
        buttonStyle.padding="10px";
        document.body.insertBefore(this.buttonStart,document.body.childNodes[1]);
    },
    //erase function
    clear:function(){
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }
}
//font welcome
function fontText(text,x,y,font,color){
    let context = myGameArea.context;
    context.fillStyle = color;
    context.font = font;
    context.fillText(text,x ,y);
}
//ball function
function makeBall(x,y){
    let context = myGameArea.context;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    context.beginPath();
    context.arc(x,y,10,0,Math.PI*2);
    context.fillStyle = "green";
    this.updateItem = function(){
        context.fill();
    }
    this.newPost = function(){
        
        this.x += this.speedX;
        this.y += this.speedY;
        
    }
}



//create square
function makeSquare(width,height,x,y,color){
    let context = myGameArea.context;
    context.fillStyle=color;
    this.speedX= 1;
    this.speedY=1;
    this.x = x;
    this.y=y;
    this.width= width;
    this.height = height;
    this.updateMovement = function(){
        context = fillRect(this.x,this.y,this.width,this.height);
    };
    
}

//detach key on the whole page

//move item
function moveItem(ball){
    if(moveUp){
        console.log("up")
        ball.y += -1;
    }
    else if(moveDown){
        ball.y +=  1;
    }
    else if(moveLeft){
        ball.x -= -1;
    }
    else if(moveRight){
        ball.x = +1;
    }
}
//clear movement
function clearItem(ball){
    ball.speedX = 0;
    ball.speedY = 0;

}

//function control game
function controlGame(){
    myGameArea.clear();
    fontText("Welcome to our Ping Pong!",200,30,"30px Arial","gray");
    ball = new makeBall(20,20);
    ball.updateItem();
    moveItem(ball);
    
    // ball.updateItem();  
}
// play again 

//store score in localStorage

//get score the highest score into game


//start game
window.addEventListener("load",
    startGame
);
setTimeout(
    document.getElementById("hey").addEventListener("keyup",function(event){
        event.preventDefault();
        moveDown=false;moveLeft=false;moveRight=false;moveRight=false;
        if(event.key=="ArrowUp")          moveUp=true;
        else if (event.key=="ArrowDown")  moveDown=true;
        else if (event.key=="ArrowRight") moveRight=true
        else if (event.key=="ArrowLeft")  moveLeft=true;
        console.log(moveLeft,moveUp,moveRight,moveDown);
    }),2000);

