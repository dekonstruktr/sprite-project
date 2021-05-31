var canvas = document.getElementById("canvas");
var drawingSurface = canvas.getContext("2d");

var image = new Image();
//image.src = "images/muybridge_sprite.png";
image.src = "images/robot_sprite.png";

image.addEventListener("load", onLoad, false);
function onLoad(){
    render();
}
var sourceX = 0;
var sourceY = 0;
var sourceWidth = 130;
var sourceHeight = 208;
var width = sourceWidth;
var height = sourceHeight;
var x = 0;
var y = 250;
var frameCount = 0;
var frameFactor = 4;
var speed = 0;
var frames = 7;
var moveRight = false;
var moveLeft = false;
function render(){

    
//animation loop
    window.requestAnimationFrame(render, canvas);
    drawingSurface.clearRect(0,0,canvas.width, canvas.height);
 drawingSurface.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
    x+= speed;
//    if (x > canvas.width){x=-130;} 
    if (x > (canvas.width - sourceWidth)){x = -sourceWidth;} 
//                                          speed = 0;}
    if (speed < 0){
        sourceY = 208}
    else if (speed > 0){
        sourceY = 0;
    }
//    if (x < (canvas.width + sourceWidth)){x = canvas.width + sourceWidth; speed = +speed;}
//    y+= speed;
    frameCount++;
    if(moveRight){
        speed+=.2;
        if(speed > 10){
            speed = 10;
        }
    }else if(moveLeft){
        speed-=.2;
        if(speed< -10){speed = -10};
    } else{
        speed=0;
    }
    
    if(frameCount % frameFactor ==0){
    if (speed ==0 ){sourceX = 0;}else{
    (sourceX > sourceWidth * (frames - 1)) ? (sourceX = 0): (sourceX += sourceWidth);
    }
    }
}

//window.addEventListener("click", onClick);
//function onClick(){
//    if (speed == 0){speed++;}
//    speed = -speed;
    
//    (sourceX > sourceWidth * (frames - 1)) ? (sourceX = 0): (sourceX += sourceWidth);
//    render();
// }
// 39 = right arrow
//40 = left arrow

window.addEventListener('keydown', onKeyDown);
function onKeyDown(e){
//    console.log(e.keyCode);
    if (e.keyCode == 39){
       //move right 
        moveRight = true;
        speed++;
    }else if (e.keyCode == 37){
        //move left
        moveLeft = true;
        speed--;
    }
    
    
}

window.addEventListener('keyup', onKeyUp);
function onKeyUp(e){
//    console.log(e.keyCode);
    if (e.keyCode == 39){
       //move right 
        moveRight = false;
        
    }else if (e.keyCode == 37){
        //move left
        moveLeft = false;
       
    }
    
    
}