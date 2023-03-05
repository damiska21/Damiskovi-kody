/*dlouhý řádek kanvasu*/var canvas = document.createElement("canvas"); canvas.width = "800"; canvas.height = "800";document.body.appendChild(canvas);var c = canvas.getContext("2d");c.scale(40, 40);

//KONSTANTY
var playerX = 1;
var playerY = 1;
var snakeLenght = 3;
var pole = 10;
var tailX = [0, 0];
var tailY = [0, 0];
var appleX;
var appleY;
var appleOnPole = false;
var dead = false;
var scoreDisplay = document.getElementById("score");
var diedDisplay = document.getElementById("died");
var goingTop = false;
var goingDown = false;
var goingRight = true;
var goingLeft = false;

//FUNKCE
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "#3b3535";//šedá
    c.fillRect(0, 0, pole, pole);

    for(var i = 0; i < snakeLenght; i++) {
        c.fillStyle = "#2fd44d";//světlejší zelená
        c.fillRect(tailX[i], tailY[i], 1, 1);
    }
    c.fillStyle = "#21a332";//zelená
    c.fillRect(playerX, playerY, 1, 1);

    c.fillStyle = "red";
    c.fillRect(appleX, appleY, 1, 1);
}
function tail() {
    for(var i = 0; i < snakeLenght; i++) {
        if(playerX == tailX[tailX.length] && playerY == tailY[tailY.length]){
            dead = false;
        }else if(playerX == tailX[i] && playerY == tailY[i]) {
            dead = true;
        }
    }
    tailX.push(playerX);
    tailX.shift();
    tailY.push(playerY);
    tailY.shift();
}
function score() {
    scoreDisplay.textContent = "score: " + (snakeLenght - 1);
}

function keyCode(event) {
    switch(event.keyCode){
        case 87://W
            goingTop = true;
            goingDown = false;
            goingLeft = false;
            goingRight = false;
            break;
        case 65://A
            goingTop = false;
            goingDown = false;
            goingLeft = true;
            goingRight = false;
            break;
        case 83: //S
            goingTop = false;
            goingDown = true;
            goingLeft = false;
            goingRight = false;
            break;
        case 68: //D
            goingTop = false;
            goingDown = false;
            goingLeft = false;
            goingRight = true;
            break;
    }
}
function move() {
    if(goingTop) {
        playerY -= 1;
    }else if(goingDown) {
        playerY += 1;
    }else if(goingRight) {
        playerX += 1;
    }else if(goingLeft) {
        playerX -= 1;
    }

    if(playerX > pole - 1) {
        playerX = pole - 1;
    }else if(playerY > pole - 1) {
        playerY = pole - 1;
    }else if(playerX < 0) {
        playerX = 0;
    }else if(playerY < 0) {
        playerY = 0;
    }
}

function apple() {
    if(!appleOnPole){
        appleX = Math.round(Math.random() * 10);
        appleY = Math.round(Math.random() * 10);
        appleOnPole = true;
        for(var i = 0; i < tailX.length; i++) {
            if(appleX == tailX[i] && appleY == tailY[i]) {
                appleOnPole = false;
                apple();
            }
        }
        if(appleX == playerX && appleY == playerY) {
            appleOnPole = false;
        }
        if(appleX >= 10) {
            appleX = 9;
        }if(appleY >= 10){
            appleY = 9;
        }
    }
    if(playerX == appleX && playerY == appleY) {
        appleOnPole = false;
        tailX.push(playerX);
        tailY.push(playerY);
        snakeLenght += 1;
    }
}

function death() {
    if(dead) { 
        console.log("ses mrtvej!");
        diedDisplay.textContent = "ZEMREL JSI";
    }
        if(playerX > pole - 1 || playerX < 0 || playerY > pole - 1 || playerY < 0) {
            dead = true;
        }
}

function mainLoop() {
    if(!dead) {
    move();
    tail();
    }
    death();
    score();
}
function speedyMainLoop() {
    apple();
    draw();
    window.requestAnimationFrame(speedyMainLoop);
}
setInterval(mainLoop, 500);
window.addEventListener("keydown", keyCode);
window.addEventListener("keyup", keyCode);
window.requestAnimationFrame(speedyMainLoop);