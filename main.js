var canvas = document.createElement("canvas"); canvas.width = 800; canvas.height = 460; document.body.appendChild(canvas);
var c = canvas.getContext("2d");

var playerX = 50;
var playerY = 50;
var playerPredniX;
var HorniPipeY = [50, 100, 200];
var PredniPipeX = [200, 400, 600];
var ZadniPipeX = [];
var gravitace = 0;
var gravitaceZrychleni = 0.2;
var died = false;
var mezernikPress = false;
var timer = 0;
var timerCounts = false;
var kolizeX = false;
var kolizeY = false;
var scoreDisplay = document.getElementById("score");
var score = 0;

function gravity() {
    gravitace += gravitaceZrychleni;
    playerY += gravitace;
    if(playerY > 400) { died = true;}
}
function jump() {
    if(mezernikPress && !timerCounts) {
        gravitace = 0 - 5;
        mezernikPress = false;
        timerCounts = true;
    }
    if(timerCounts) {
        timer += 1;
    }
    if(timer > 10) {
        timer = 0;
        timerCounts = false;
        mezernikPress = false;
    }
}
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if(!died){
    c.fillStyle = "yellow";
    c.fillRect(playerX, playerY, 50, 50);
    }else if(died) {
        c.fillStyle = "red";
        c.fillRect(playerX, playerY, 50, 50);
    }
    //země
    c.fillStyle = "#1b9917";
    c.fillRect(0, 450, 5000, 10);
    //pipy
    for(var i = 0;i < PredniPipeX.length;i++) {
    c.fillStyle = "#08ff00";
    c.fillRect(PredniPipeX[i], 0, 50, HorniPipeY[i]);
    c.fillRect(PredniPipeX[i], HorniPipeY[i] + 150, 50, 500);
    }
}
function KeyPress(event) {
    mezernikPress = false;
    if(event.keyCode = 32) {
        mezernikPress = true;
    }else{
        mezernikPress = false;
    }
}

function pipe() {
    for(var i = 0; i < PredniPipeX.length; i++) {
    ZadniPipeX[i] = PredniPipeX[i] + 50; //pokud budeš měmit tloušťku pipy, změň jí i tady
    playerPredniX = playerX + 50;
    

    if(PredniPipeX[i] < -50) {
        PredniPipeX[i] = 600;
        HorniPipeY[i] = 50 + Math.random() * 200;
        score += 1;
        scoreDisplay.textContent = "Score: " + score;
    }

    if((playerPredniX > PredniPipeX[i] && playerPredniX < ZadniPipeX[i]) || (playerX > PredniPipeX[i] && playerX < ZadniPipeX[i])) {
        kolizeX = true;
    }else{
        kolizeX = false;
    }
    if(playerY < HorniPipeY[i] || playerY + 50 > HorniPipeY[i] + 150) {
        kolizeY = true;
    }else{
        kolizeY = false;
    }
    if(kolizeX && kolizeY) {
        died = true;
        console.log("died");
    }
    PredniPipeX[i] -= 1;
}
}

function mainLoop() {
    if(!died){
        jump();
        gravity();
        draw();
        pipe();
    }
    draw();
    window.requestAnimationFrame(mainLoop);
}

window.addEventListener("keydown", KeyPress);
window.addEventListener("keyup", KeyPress);
window.addEventListener("load", mainLoop);