function preload() {
    crabcrab = loadImage('crab.png');
    treetree = loadImage('tree2.png');
    wavewave = loadImage('wave2.png');
    honeyhoney = loadImage('honey.png');
    potpot = loadImage('pot.png');
    beebee = loadImage('bee.png');
}
let flagger;
let game;

function setup() {
    createCanvas(541, 601);
    currentScreen = hexScreen;
    flagger = new Flagger(90, 40, 50, potpot, color('rgba(252,180,58, 0.8)'));
    standard = new Game(10, 15);
    hexGame = new Game(12, 20);
    standard.makeField();
    standard.populateGrid(Cell);
    standard.plantBombs();
    hexGame.makeField();
    hexGame.populateGrid(Hex);
    hexGame.plantBombs();
}

function draw() {
    //    if (currentScreen = standardScreen) {
    //        drawStandardGame();
    //    }
    if (currentScreen = hexScreen) {
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
