function preload() {
    crab = loadImage('img/crab3.png');
    tree = loadImage('img/tree2.png');
    wave = loadImage('img/wave2.png');
    honey = loadImage('img/honey.png');
    pot = loadImage('img/pot.png');
    bee = loadImage('img/bee.png');
    drop = loadImage('img/drop.png');
}
let flagger;
let game;
let buttons = [];

function setup() {
    createCanvas(541, 601);
    currentScreen = langingScreen;
    flagger = new Flagger(90, 40, 50, tree, color('rgba(252,180,58, 0.8)'));
    standard = new Game(10, 15);
    hexGame = new Game(12, 15);
    standard.makeField();
    standard.populateGrid(Cell);
    standard.plantBombs();
    hexGame.makeField();
    hexGame.populateGrid(Hex);
    hexGame.plantBombs();
    
    resetButton = new Button();
    menuButton = new Button();
//    standardButton = new Button();
//    hexButton = new Button();
//    colourButton = new Button();
//    instructionsButton = new Button();
    
    
}

function draw() {
    if(currentScreen == landingScreen){
        drawLanding();
    }
    if (currentScreen == standardScreen) {
        drawStandardGame();
    }
    if (currentScreen == hexScreen) {
        drawHexGame();
    }
}

function mouseClicked() {
    flagger.click();
    if (currentScreen == standardScreen) {
        standard.start = true;
        for (let i = 0; i < standard.dimensions; i++) {
            for (let j = 0; j < standard.dimensions; j++) {
                if (standard.grid[i][j].click(mouseX, mouseY)) {
                    standard.grid[i][j].flag();
                }
            }
        }
    } else if (currentScreen == hexScreen) {
        hexGame.start = true;
        for (let i = 0; i < hexGame.dimensions; i++) {
            for (let j = 0; j < hexGame.dimensions; j++) {
                if (hexGame.grid[i][j].click(mouseX, mouseY)) {
                    console.log([hexGame.grid[i][j].i, hexGame.grid[i][j].j])
                    hexGame.grid[i][j].flag();
                }
            }
        }
    }
}
