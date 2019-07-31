function makeField(cols, rows) {
    let field = new Array(cols);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(rows);
    }
    return field;
}

let cols;
let rows;
let l = 50;
let grid;
let allCrabs = 15;

function setup() {
    createCanvas(501, 501);
    cols = floor(width / l);
    rows = floor(height / l);
    grid = makeField(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, l);
        }
    }

    let options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < allCrabs; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        options.splice(index, 1);
        grid[i][j].crab = true;
    }
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].countCrabs();
        }
    }
}


function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].click(mouseX, mouseY)) {
                grid[i][j].reveals();
            }
        }
    }
}

function draw() {
    background(130);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}
