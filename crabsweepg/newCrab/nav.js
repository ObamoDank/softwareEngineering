const landing = 1;
const standardScreen = 2;
const hexScreen = 3;
const colourScreen = 4;
const instructions = 5;
let currentScreen;

function goToLanding() {
    currentScreen = landing;
}

function goToStandard() {
    flagger = new Flagger(90, 40, 50, treetree, '#008e54')
    currentScreen = standardScreen;
}

function goToHex() {
    flagger = new Flagger(90, 40, 50, potpot, '#000000');
    currentScreen = hexScreen;
}

function goToColour() {
    currentScreen = colourScreen;
}

function goToInstructions() {
    currentScreen = instructions;
}

function drawLanding() {
    
}

function drawStandardGame() {
    flagger.show();
    standard.displayTimer();
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
