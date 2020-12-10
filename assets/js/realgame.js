//border game
let canvas = document.createElement("canvas")
canvas.width=500;
canvas.height=400;
canvas.style.border="1px solid black";
document.body.append(canvas);
canvas.tabIndex=1;
canvas.id="hey"
let context = canvas.getContext("2d")
//control 
let up=false,down=false,left=false,right=false

function earseRectangle(){
    context.fillStyle="white"
    context.fillRect(0,0,500,400);
}

//global viriable
function drawBall(x,y,speed){
    return{
        x:x,
        y:y,
        s:speed,
        update:function(){
            context.beginPath(),
            context.arc(this.x,this.y,10,0,Math.PI*2),
            context.fillStyle="green",
            context.fill();
        }
    }
}
function drawRectangle(x,y,width,height,speed){
    return{
        x:x,
        y:y,
        s:speed,
        width:width,
        height:height,
        update:function(){
            context.fillStyle="black";
            context.fillRect(this.x,this.y,this.width,this.height);
        }
    }
}
let ball = drawBall(20,30);
let rectangle =drawRectangle(20,40,30,10,10)
//between
function isWithin(a,b,c){
    return(b>a && b<c)
}

function isColliding(a,b,c){
    let result = false;
    // if(isWithin())
}

function moveBall(item){
    
    if(left)  item.x -= 1;
    else if(right) item.x += 1;
}

//start game
function startGame(){
    // eraseRect();
    context.clearRect(0,0,canvas.width,canvas.height);
    rectangle.update()
    moveBall(ball)
    ball.update()
}

document.getElementById("hey").addEventListener("keydown",function(event){
    up=false,left=false,right=false,left=false
    if(event.key=="ArrowUp")           up  = true;
    else if(event.key=="ArrowDown")  down  = true;
    else if(event.key=="ArrowLeft")  left  = true;
    else if(event.key=="ArrowRight") right = true;
    
    startGame();
})
startGame();
setInterval()