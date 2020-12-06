//movement check
let moveUp=false,moveDown=false,moveLeft=false,moveRight=false;


//Game start
function startGame(){
    myGameArea.start(); 
    let snake = new makeSquare(30,30,10,120,"#ff7a3c");  
}

//create the area of the game
// we dont use css because it will damage the picture
let myGameArea = {
    canvas: document.createElement("canvas"),
    start:function(){
        //the area of game play
        this.canvas.width = 900;
        this.canvas.height= 600;
        this.canvas.style.border="1px solid black";
        this.canvas.style.margin = "auto";
        this.canvas.style.display = "block";
        this.context = this.canvas.getContext('2d');
        
        //insert to body 
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    //erase function
    clear:function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
    }
}

//create square
function makeSquare(width,height,x,y,color){
    let context = myGameArea.context;
    context.fillStyle=color;
    context.fillRect(x,y,width,height);
}

//detach key on the whole page
window.addEventListener("keyup",function(event){
    event.preventDefault();
    moveDown=false;moveLeft=false;moveRight=false;moveRight=false;
    if(event.key=="ArrowUp")          moveUp=true;
    else if (event.key=="ArrowDown")  moveDown=true;
    else if (event.key=="ArrowRight") moveRight=true
    else if (event.key=="ArrowLeft")  moveLeft=true;
    console.log(moveLeft,moveUp,moveRight,moveDown);
});
//function control game

// play again 

//store score in localStorage

//get score the highest score into game


//start game
window.addEventListener("load",
    startGame
);

