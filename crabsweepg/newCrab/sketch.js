function preload() {
    crab = loadImage('img/crab3.png');
    tree = loadImage('img/tree2.png');
    wave = loadImage('img/wave2.png');
    honey = loadImage('img/honey.png');
    pot = loadImage('img/pot.png');
    bee = loadImage('img/bee.png');
    drop = loadImage('img/drop.png');
    galaxy = loadImage('img/galaxy.png')
    sun = loadImage('img/sun2.png')
    heart = loadImage('img/heart.png')
    water = loadImage('img/water.png')
    fire = loadImage('img/fire.png');
    wind = loadImage('img/wind.png');
    hole = loadImage('img/hole.png');
    eart = loadImage('img/eart.png');
}
let flagger;
let standard;
let hexGame;
let planetGame;
let buttons = [];

function setup() {
    createCanvas(541, 601);
    currentScreen = landingScreen;
    flagger = new Flagger(90, 40, 50, hole, color('rgba(252,180,58, 0.8)'));
    
    resetButton = new Button(475, 25, 100, 25, 4);
    menuButton = new Button(475, 60, 100, 25, 0);
    standardButton = new Button(width / 2, 200, 200, 80, 1);
    hexButton = new Button(width / 2, 350, 200, 80, 2);
    planetButton = new Button(width / 2, 500, 200, 80, 3);
    //    instructionsButton = new Button();


}

function draw() {
    if (currentScreen == landingScreen) {
        drawLanding();
    }
    if (currentScreen == standardScreen) {
        drawStandardGame();
    }
    if (currentScreen == hexScreen) {
        drawHexGame();
    }
    if (currentScreen == planetScreen) {
        drawPlanetGame();
    }

}

function mouseClicked() {
    flagger.click();
    clickEvent();
}
