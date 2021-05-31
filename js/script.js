var canvas = document.getElementById("canvas");
var drawingSurface = canvas.getContext("2d");
var timer = document.getElementById("timer");
var image = new Image();
var winLose = false;

image.src = "images/girl.png";

image.addEventListener("load", onLoad, false);

function onLoad() {

    render();
    document.getElementById('music').play();
}
// Sprite Prototype
function Sprite(source, sx, sy, sw, sh, x, y, w, h, frames, sp, fc, ff) {
    this.image = new Image();
    this.image.src = source;
    this.sourceX = sx;
    this.sourceY = sy;
    this.sourceHeight = sh;
    this.sourceWidth = sw;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.frames = frames;
    this.speed = sp;
    this.frameCount = fc;
    this.moveUp = false;
    this.frameFactor = ff;
}

//Girl Sprite
var girl = new Sprite("images/girl.png", 0, 0, 64, 128, 0, 460, 64, 128, 9, 0, 0, 4);
// Pumpkin Sprite
var pumpkin = new Sprite("images/pumpkin2.png", 0, 0, 129, 130, pumpkinInitX, -10, 130 / 2, 130 / 2, 12, 2, 1, 4);
// Background and Fog Sprites
var background = new Sprite("images/background.jpg", 0, 0, 1860, 700, 0, 0, 1860, 700, 1)
var fog = new Sprite("images/fog.png", 0, 0, 2000, 190, 0, 520, 2000, 190, 1);
var friction = .99;
var sprites = [];
sprites.push(background);
sprites.push(girl);
sprites.push(pumpkin);
sprites.push(fog);
var pumpkinInitX;
//This function determines a hit from the pumpkin
function hitTest(x) {
    if (pumpkin.x + pumpkin.width > girl.x && pumpkin.x < girl.x + girl.width && pumpkin.y > 460) {
        isHit();
        x = true;
        winLose = true;
    } else {
        drawElapsedTime();
        x = false;
    }
}

function render() {
//This conditional will stop the rendering if a loss state occurs.
    if (!winLose) {




        background.x -= (girl.speed * 0.25);
        fog.x -= (girl.speed * 0.05);
        //animation loop
        window.requestAnimationFrame(render, canvas);
        drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < sprites.length; i++) {
            var s = sprites[i];

            drawingSurface.drawImage(s.image, s.sourceX, s.sourceY, s.sourceWidth, s.sourceHeight, s.x, s.y, s.width, s.height);
        }

        if (background.x < -920) {
            background.x = 0;
        } else if (background.x > 0) {
            background.x = -920;
        }
        if (fog.x < -1000) {
            fog.x = 0;
        } else if (fog.x > 0) {
            fog.x = -1000;
        }


        //    
        girl.x += girl.speed;
        // 
        if (girl.x > (canvas.width)) {
            girl.x = -girl.sourceWidth;
        }

        if (girl.x < -girl.sourceWidth) {
            girl.x = (canvas.width - girl.sourceHeight - 1);
        }
       
        if (girl.speed < 0) {
            girl.sourceY = 128
        } else if (girl.speed > 0) {
            girl.sourceY = 0;
        }
        //  
        girl.frameCount++;
        pumpkin.frameCount++;
        pumpkin.y += 10;
        if (hitTest(winLose)) {

            isHit();

        }

        pumpkin.x = pumpkinInitX;
        if (pumpkin.frameCount % pumpkin.frameFactor == 0) {
            pumpkin.sourceX += pumpkin.sourceWidth;
            if (pumpkin.sourceX > pumpkin.sourceWidth * (pumpkin.frames - 1)) {
                pumpkin.sourceX = 0;



            }
        }
        
        //This conditional causes the pumpkin to drop again from the top after it clears the screen
        if (pumpkin.y > 800) {

            pumpkinInitX = Math.floor(Math.random() * 931);
            pumpkin.x = pumpkinInitX;
            pumpkin.y = 0;
        }

        if (girl.moveRight) {
            girl.speed += .2;
            if (girl.speed > 10) {
                girl.speed = 10;
            }
        } else if (girl.moveLeft) {
            girl.speed -= .2;
            if (girl.speed < -10) {
                girl.speed = -10
            }
        } else {
            girl.speed = 0;
        }
        girl.speed *= friction;
        pumpkin.y += 10;
        if (girl.frameCount % girl.frameFactor == 0) {
            if (girl.speed == 0) {
                girl.sourceX = 0;
            } else {
                (girl.sourceX > girl.sourceWidth * (girl.frames - 1)) ? (girl.sourceX = 0) : (girl.sourceX += girl.sourceWidth);
            }
        }
    }
}




window.addEventListener('keydown', onKeyDown);

function onKeyDown(e) {
    //    console.log(e.keyCode);
    if (e.keyCode == 39) {
        //move right 
        girl.moveRight = true;
        girl.speed++;
    } else if (e.keyCode == 37) {
        //move left
        girl.moveLeft = true;
        girl.speed--;
    } else if (e.keyCode == 38) {
        girl.moveUp = true;
    } else if (e.keyCode == 82) {
        winLose = false;
        window.location.reload(false)
    }

}

window.addEventListener('keyup', onKeyUp);

function onKeyUp(e) {
    //    console.log(e.keyCode);
    if (e.keyCode == 39) {
        //move right 
        girl.moveRight = false;

    } else if (e.keyCode == 37) {
        //move left
        girl.moveLeft = false;

    } else if (e.keyCode == 38) {
        girl.moveUp = false;
    }


}
//This function clears the timer and sets the final score when hit
function isHit() {

    clearInterval(theInterval);
    drawFinalScore();
  

    return
}
var startTime = new Date();
var theInterval = setInterval(render, 20000);

// ending elapsed time in seconds
var score;
//Time drawing function
function drawElapsedTime() {
    var elapsed = parseInt((new Date() - startTime) / 1000);
    timer.textContent = elapsed + " secs";

}
//Final Score drawing function
function drawFinalScore() {
    // set the final score just once
    if (score == null) {
        score = parseInt((new Date() - startTime) / 1000);
    }

    timer.textContent = "Game Over: " + score + " secs. Press R to retry";

}


