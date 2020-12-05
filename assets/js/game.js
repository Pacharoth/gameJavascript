//Game start
function startGame(){
    myGameArea.start(); 
    let snake = new makeSquare(30,30,10,120,"#ff7a3c").update();  
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
    // create function update
    this.update= function(){
        context.fillStyle=color;
        context.fillRect(x,y,width,height);
    }
}
window.addEventListener("load",
    startGame
);

