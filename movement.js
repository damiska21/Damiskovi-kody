var playerX = 50;
var playerY = 50;
var ground = 300;
var gravitace = 0;
var gravitaceZrychleni = 0.2;

/*canvas*/var canvas = document.createElement("canvas"); canvas.width = 600; canvas.height = 600; document.body.appendChild(canvas);
var c = canvas.getContext("2d");

function draw() {//funkce začíná function, potom jméno funkce, (parametry(nechte to prázdné)) a {sem kód}
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, 50, 50);
}

function gravity() {
    playerY += gravitace; // playerY = playerY + gravitace;
    if(playerY < ground - 50) {
        gravitace += gravitaceZrychleni;
    }else if(playerY > ground - 50) {
        gravitace = 0; //nastavujeme gravitaci na 0 pokud je hráč na zemi
    }
}

function mainLoop() { //spouští se každý snímek hry
    draw();
    gravity();
    window.requestAnimationFrame(mainLoop);
}

window.addEventListener("load", mainLoop);