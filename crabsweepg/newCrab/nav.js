const landingScreen = 1;
const standardScreen = 2;
const hexScreen = 3;
const planetScreen = 4;
const instructions = 5;
let currentScreen;

function goToLanding() {
    currentScreen = landingScreen;
    standard = null;
    hexGame = null;
    planetGame = null;
}

function goToStandard() {
    flagger = new Flagger(90, 40, 50, tree, '#008e54')
    standard = new Game(10, 10);
    standard.populateGrid(Cell);
    standard.plantBombs();
    currentScreen = standardScreen;
}

function goToHex() {
    flagger = new Flagger(90, 40, 50, pot, color('rgba(252,180,58, 0.8)'));
    hexGame = new Game(12, 20);
    hexGame.populateGrid(Hex);
    hexGame.plantBombs();
    currentScreen = hexScreen;
}

function goToPlanet() {
    flagger = new Flagger(90, 40, 50, hole, '#111111')
    planetGame = new Game(3, 0);
    planetGame.populateGrid(Planet);
    planetGame.trimBombs();
    currentScreen = planetScreen;
}

function goToInstructions() {

    currentScreen = instructions;
}

function drawLanding() {
    background(100);
    textAlign(CENTER);
    textSize(25);
    text("Welcome to Minesweeper", width / 2, 75);
    standardButton.show("#ffffff", "#ffffff", 20, "Crab Sweep", "black");
    hexButton.show("#ffffff", "#ffffff", 20, "Bee Sweep", "black");
    planetButton.show("#ffffff", "#ffffff", 20, "Planet Sweep", "black");
}

function drawStandardGame() {
    background('#111E6C');
    rectMode(CENTER);
    noStroke();
    fill('#000080');
    rect(width / 2, height / 2 + 35, 520, 520);
    rectMode(CORNER);
    flagger.show();
    standard.displayTimer('orange', 'orange', 20);
    for (let i = 0; i < standard.dimensions; i++) {
        for (let j = 0; j < standard.dimensions; j++) {
            standard.grid[i][j].show();
        }
    }
    resetButton.show(color('rgba(0,191,255, 0.5)'), color('rgba(0,191,255, 0.8)'), 20, "Reset", "black");
    menuButton.show(color('rgba(0,191,255, 0.5)'), color('rgba(0,191,255, 0.8)'), 20, "Menu", "black");
}

function drawHexGame() {
    fill("#f3c622");
    stroke('#dddddd')
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (j % 2 == 0) {
                hexagon(-35 + i * 35, 0 + j * 31);
            } else {
                hexagon(-52.5 + i * 35, 0 + j * 31);
            }
        }
    }
    image(honey, 0, 0, 541, 250);
    rectMode(CENTER);
    noStroke();
    fill(153, 36, 9, 150);
    rect(width / 2, height / 2 + 35, 500, 500, 50);
    rectMode(CORNER);
    flagger.show();


    hexGame.displayTimer('#992409', '#3a3637', 20);
    for (let i = 0; i < hexGame.dimensions; i++) {
        for (let j = 0; j < hexGame.dimensions; j++) {
            hexGame.grid[i][j].show();
        }
    }
    resetButton.show(color('rgba(252,180,58, 0.8)'), color('rgba(252,180,58, 0.8)'), 20, "Reset", "black");
    menuButton.show(color('rgba(252,180,58, 0.8)'), color('rgba(252,180,58, 0.8)'), 20, "Menu", "black");
}

function drawPlanetGame() {
    textSize(20);
    background('#000000');
    imageMode(CENTER);
    fill('#000000')
    stroke("rgba(128, 0, 128, 1)");
    ellipse(width / 2, height / 2 + 30, 500)
    ellipse(width / 2, height / 2 + 30, 375)
    ellipse(width / 2, height / 2 + 30, 250)
    image(galaxy, width / 2, height / 2);
    image(sun, width / 2, height / 2 + 30, 400, 400);
    stroke('orange');
    text(planetGame.allBombs + " Bombs", 450, 100);
    text("5 Planets", 100, 100)
    flagger.show();
    planetGame.displayTimer('orange', 'orange', 20);
    for (let i = 0; i < planetGame.grid.length; i++) {
        for (let j = 0; j < planetGame.grid[i].length; j++) {
            planetGame.grid[i][j].rotate();
            planetGame.grid[i][j].show();
        }
    }
    resetButton.show(color('rgba(128,0,128, 0.8)'), color('rgba(128,0,128, 0.8)'), 20, "Reset", "black");
    menuButton.show(color('rgba(128,0,128, 0.8)'), color('rgba(128,0,128, 0.8)'), 20, "Menu", "black");
}

function drawInstructions() {

}
