//border game
let canvas = document.createElement("canvas")
canvas.width=500;
canvas.height=400;
canvas.style.border="1px solid black";
document.body.append(canvas);
let context = canvas.getContext("2d")

//control 
let up=false,down=false,left=false,right=false

function earseRectangle(){
    context.fillStyle="white"
    context.fillRect(0,0,500,400);
}


function drawBall(x,y){
    this.x = x;
    this.y = y;
    context.beginPath();
    context.arc(x,y,10,0,Math.PI*2);
    context.fillStyle="green";
    this.update=()=>{
        context.fill();
    }
}

function drawRectangle(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.update=()=>{
        context.fillStyle="black";
        context.fillRect(this.x,this.y,this.width,this.height);
    }
}
function moveItem(item){
    if(up)         item.y -= 1;
    else if(down)  item.y += 1;
    else if(left)  item.x -= 1;
    else if(right) item.x += 1;
}
//start game
function startGame(){
    // earseRectangle();
    context.clearRect(0,0,canvas.width,canvas.width)
    ball = new drawBall(20,30);
    ball.x+=1;
    ball.y-=2;
    ball.update();
    rect= new drawRectangle(50,50,200,10);
    rect.update();
}
window.addEventListener("keyup",function(event){
    up=false,left=false,right=false,left=false
    if(event.key=="ArrowUp")           up  = true;
    else if(event.key=="ArrowDown")  down  = true;
    else if(event.key=="ArrowLeft")  left  = true;
    else if(event.key=="ArrowRight") right = true;
  
})
startGame();
