/*canvas*/var canvas = document.createElement("canvas");canvas.width = 500;canvas.height =500;document.body.appendChild(canvas);var c = canvas.getContext("2d");

//KONSTANTY
var playerX = 50;
var playerY = 50;
var playerPredniX;
var playerSpodniY;
var ground = 300;
var gravitace = 0;
var gravitaceZrychleni = 1;
var mezernikPress = false;
var inAir = true;
var enemyX = 500;
var enemyY = 300;
var enemyZadniX;
var dead = false;
var scoreDisplay = document.getElementById("score");
var scoreCounter = 0;
var kolizeX = false;
var kolizeY = false;
var enemySpeed = 5;

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, 50, 50);

    c.fillStyle = "red";
    c.fillRect(enemyX, enemyY, 50, 50);

    c.fillStyle = "black";
    c.fillRect(0, ground + 50, 1000, 10);
}

function playerUpdate() {
    playerPredniX = playerX + 50;
    playerSpodniY = playerY + 50;
    enemyZadniX = enemyX + 50;
    scoreCounter += 1;
    scoreDisplay.textContent = "Score: " + scoreCounter;
}

function enemyAI() {
    enemyX -= enemySpeed;
    enemySpeed += 0.005;
    if((/*skok ze zhora*/playerY > enemyY && playerY < playerY + 50) || (playerSpodniY > enemyY && playerSpodniY < enemyY + 50)) {//dodělat kolizi aby fungovali ptáci
        kolizeY = true; 
    }
    if(playerY > enemyY + 50 || playerSpodniY < enemyY){
        kolizeY = false;
    }
    if(playerPredniX > enemyX && playerX < enemyZadniX) {
        kolizeX = true;
    }else /*if(playerX > enemyX + 50 &&)*/{
        kolizeX = false;
    }
    if(kolizeX && kolizeY) {
        dead = true;
    }
    if(enemyX < playerX - 100) {
        enemyX = 600 + (Math.random() * 100);
        enemyY = 250 + (Math.random() * 80);
        if(enemyY > 300) {
            enemyY = 300;
        }
    }
    
}

function gravity() {
    playerY = playerY + gravitace;

    if(playerY < ground) {
        gravitace = gravitace + gravitaceZrychleni;
        inAir = true;
    }else if(playerY > ground) {
        playerY = ground;
        gravitace = 0;
        inAir = false;
    }
    //SKOK
    if(mezernikPress && !inAir) {
        gravitace = gravitace - 20;
    }
    if(inAir) { mezernikPress = false;}
}
function KeyCode(event) {
    switch(event.keyCode) {
        case 32://mezernik
            mezernikPress = true;
            break;
    }
}
function mainLoop() {
    draw();
    if(!dead) {
    gravity();
    playerUpdate();
    enemyAI();
    }
    window.requestAnimationFrame(mainLoop);
}

window.addEventListener("keydown", KeyCode);
window.addEventListener("keyup", KeyCode);
window.requestAnimationFrame(mainLoop);