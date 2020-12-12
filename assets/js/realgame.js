let canvas = document.getElementById("game");
canvas.width=700;
canvas.height=500;
let context = canvas.getContext("2d")
//move game
let moveUp=false,moveDown=false

// backgroundgame
function drawBackground(){
    context.fillStyle='#000';
    context.fillRect(0,0,canvas.width,canvas.height);
}
drawBackground();
let rect=drawRect(10,479,20,20,7,"#C24641");

//draw rect
function drawRect(x,y,width,height,speed,color){
    return{
        x:x,
        y:y,
        s:speed,
        w:width,
        h:height,
        c:color,
        draw:function(){
            context.fillStyle=this.c;
            context.fillRect(this.x,this.y,this.w,this.h);
        },
        erase:function(){
            context.fillStyle="black";
            context.fillRect(0,0,canvas.width,canvas.height);
            
        }
    }
}
function assignText(){
    context.font='50px sans-serif';
    context.fillStyle='white';
    context.textAlign='center';
    context.fillText("Welcome to our Game",300,100);
    context.fillText("Click to Start Game", canvas.width/2,canvas.height/2);
}

function assignScore(number){
    context.font='20px sans-serif';
    context.fillStyle='white';
    context.fillText("Score:"+number, 50, 50);

}

function moveRec(rect){
    if(rect.y<=480 && rect.y>=420){
        if(moveUp)rect.y-=rect.s;
        else if(moveDown)rect.y+=rect.s;
    }
    // else if(rect.y<420){
    //     rect.y=420;
    // }
    // else if(rect.y>480){
    //     rect.y=480;
    // }
    rect.draw();
}
//create collision


function dropRec(rect){
    // rect.x+=rect.s;
    rect.y+=rect.s;
    
    rect.draw();
    requestAnimationFrame(dropRec);

}
//start game 
function startGame(){
    rect.erase();
    assignScore(10);
    // moveRec(rect);
    dropRec(rect);
    // setInterval(dropRec(rect),100)
}
// setInterval(startGame,100);
// startGame();
assignText();

let game = document.addEventListener("keydown",function(event){
    moveUp=false;moveDown=false;
    if(event.key=="ArrowUp")moveUp=true;
    else if(event.key=="ArrowDown")moveDown=true;
    startGame();
})
document.addEventListener("click",function(){
    startGame();
})

