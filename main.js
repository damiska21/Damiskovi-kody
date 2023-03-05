var canvas = document.createElement("canvas"); canvas.width = 500; canvas.height = 510; document.body.appendChild(canvas); var c = canvas.getContext("2d");

var paddleY = 0;
var enemyPaddleY = 0;
var ballX = 350;
var ballY = 250;
var paddleWidth = 120;
var ballGoingLeft = true;
var ballAngle = 20;
var ballSpeed = 3;
var gameOver = false;
var Pscore = 0;
var Escore = 0;
var scoreDisplay = document.getElementById("score");
var buttonDisplay = document.getElementById("button");

function paddle() {
    if (paddleY < 10) {
        paddleY = 10;
    }else if (paddleY + paddleWidth >= 385) {
        paddleY = 265;
    }
}

function enemy() {
    if (enemyPaddleY < 10) {
        enemyPaddleY = 10;
    }else if (enemyPaddleY + paddleWidth >= 385) {
        enemyPaddleY = 265;
    }

    //pohyb
    if (ballY < enemyPaddleY) {
        enemyPaddleY -= 1.5;
    }else if(ballY > enemyPaddleY) {
        enemyPaddleY += 1.5;
    }
}

function ball() {
    if (ballGoingLeft) {
        ballX -= ballSpeed;
        ballY += ballAngle * 0.1;
    }else{
        ballX += ballSpeed;
        ballY += ballAngle * 0.1;
    }
    if (ballY >= 340) {
        ballAngle *= -1;
        ballY = 340;
    }else if (ballY <= 10) {
        ballY = 10;
        ballAngle *= -1;
    }

    if((ballX <= 10 && (paddleY < ballY && paddleY + 150 > ballY) && ballGoingLeft) || ((ballX <= 10 && (paddleY > ballY && paddleY < ballY + 50)))) {
        ballGoingLeft = false;
        if(ballSpeed < 10){
            ballSpeed += 1;
        }
        ballAngle = ((Math.random()) * 100);
    }
    if(ballX >= 440 && (enemyPaddleY < ballY && enemyPaddleY + 150 > ballY && !ballGoingLeft) || ((ballX >= 440 && (enemyPaddleY > ballY && enemyPaddleY < ballY + 50)))) {
        ballGoingLeft = true;
        if(ballSpeed < 10){
            ballSpeed += 1;
        }
        ballAngle = ((Math.random()) * 100);
    } 
}

function gameloop() {
    if(ballX + 50 < 0) {
        gameOver = true;
        buttonDisplay.style.display = "block";
        Escore++; 
        scoreDisplay.textContent = "Score: " + Pscore + " - " + Escore;
    }else if(ballX > 500){
        gameOver = true;
        buttonDisplay.style.display = "block";
        Pscore++;
        scoreDisplay.textContent = "Score: " + Pscore + " - " + Escore;
    }
}

function restart() {
    buttonDisplay.style.display = "none";
    ballX = 350;
    ballY = 250;
    ballSpeed = 3;
    ballGoingLeft = true;
    gameOver = false;
    mainLoop();
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "black";
    c.fillRect(0, 0, 500, 10);
    c.fillRect(0, 385, 500, 10);

    c.fillRect(ballX, ballY, 50, 50);

    c.fillStyle = "blue";
    c.fillRect(0, paddleY, 10, paddleWidth);

    c.fillStyle = "red";
    c.fillRect(490, enemyPaddleY, 10, paddleWidth);
}

function mainLoop() {
    if (!gameOver) {
    buttonDisplay.style.display = "none";
    paddle();
    enemy();
    gameloop();
    draw();
    ball();
    window.requestAnimationFrame(mainLoop);
    }
}

document.addEventListener("mousemove", (event) => {
	paddleY = event.clientY - 115;
});
window.requestAnimationFrame(mainLoop);