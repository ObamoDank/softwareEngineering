function makeField(cols, rows) {
    let field = new Array(cols);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(rows);
    }
    return field;
}

let flagger;
let cols;
let rows;
let l = 20;
let grid;
let allBees = 10;
let xShift = false;
let gg = false;
let score = 0;
let start = false;
let revealCount = 0;
let gridSize = 0;

function setup() {
    createCanvas(541, 601);
    flagger = new Flagger(50, 50, 50);
    cols = 12;
    rows = 12;
    grid = makeField(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (!xShift) {
                grid[j][i] = new Hex(j, i, l, xShift);
            } else {
                grid[j][i] = new Hex(j, i, l, xShift);

            }
            xShift = !xShift;
            gridSize++;
            console.log(gridSize);
        }
    }

    let options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < allBees; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        options.splice(index, 1);
        grid[i][j].bee = true;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].countBees(cols);
        }
    }
}

function lose() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let cc = grid[i][j];
            if (cc.reveal == false && cc.bee) {
                cc.reveal = true;
            }
        }
        gg = true;
        score = 'You Lose';
    }
}

function win() {
    gg = true;
    score = 'Congratz, your score is ' + score;
}

function draw() {
    drawBackground();
    flagger.show();
    displayTimer();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function hexagon(x, y) {
    beginShape();
    vertex(-2.45 + x, 20 + y);
    vertex(15.32 + x, 10 + y);
    vertex(15.32 + x, -10 + y);
    vertex(-2.45 + x, -20 + y);
    vertex(-19.5 + x, -10 + y);
    vertex(-19.5 + x, 10 + y);
    vertex(-2.45 + x, 20 + y);
    endShape(CLOSE);
}



function mouseClicked() {
    start = true;
    flagger.click();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].click(mouseX, mouseY)) {
                console.log([grid[i][j].i, grid[i][j].j])
                grid[i][j].flag();
            }
        }
    }
}

function countTime() {
    if (!gg && start) {
        if (frameCount % 60 == 0) {
            score++;
        }
    }
}

function displayTimer() {
    countTime();
    textSize(20);
    textAlign(CENTER);
    fill('orange');
    text('Score: ' + score, width / 2, 50);
}

function drawBackground() {
    background('#111E6C');
    rectMode(CENTER);
    noStroke();
    fill('#000080');
    rect(width / 2, height / 2 + 35, 520, 520);
    rectMode(CORNER);
}
