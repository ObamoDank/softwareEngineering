const landingScreen = 1;
const standardScreen = 2;
const hexScreen = 3;
const colourScreen = 4;
const instructions = 5;
let currentScreen;

function goToLanding() {
    currentScreen = landingScreen;
}

function goToStandard() {
    flagger = new Flagger(90, 40, 50, tree, '#008e54')
    currentScreen = standardScreen;
}

function goToHex() {
    flagger = new Flagger(90, 40, 50, pot, '#000000');
    currentScreen = hexScreen;
}

function goToColour() {
    currentScreen = colourScreen;
}

function goToInstructions() {

    currentScreen = instructions;
}

function drawLanding() {
    background(100);
    textAlign(CENTER);
    textSize(25);
    text("Welcome to Minesweeper", width / 2, 75);
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
}

function drawColourGame() {

}

function drawInstructions() {

}
