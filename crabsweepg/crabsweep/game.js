function Game(dimensions) {
    let dimensions = dimensions;
    let l = 50;
    let grid;
    let allCrabs = 10;
    let gg = false;
    let score = 0;
    let start = false;
    let revealCount = 0;
    let gridSize = 0;
}

Game.prototype.makeField = function () {
    let field = new Array(this.dimensions);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(this.dimensions);
    }
    return field;
}

Game.prototype.populateGrid = function (Tile) {
    this.grid = this.makeField();
    for (let i = 0; i < this.dimensions; i++) {
        for (let j = 0; j < this.dimensions; j++) {
            this.gridSize++;
            this.grid[i][j] = new Tile(i, j, l);

        }
    }
}

Game.prototype.plantBombs = function () {
    let options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < allBombs; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        options.splice(index, 1);
        this.grid[i][j].bomb = true;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].countBombs();
        }
    }
}

Game.prototype.lose = function () {
    for (let i = 0; i < this.dimensions; i++) {
        for (let j = 0; j < this.dimensions; j++) {
            let gameCount = grid[i][j];
            if (gameCount.reveal == false && gameCount.crab) {
                gameCount.reveal = true;
            }
        }
        this.gg = true;
        this.score = 'You Lose';
    }
}

Game.prototype.win = function () {
    this.gg = true;
    this.score = 'Congratz, your score is ' + score;
}

Game.prototype.countTime = function() {
    if (!this.gg && this.start) {
        if (frameCount % 60 == 0) {
            this.score++;
        }
    }
}

Game.prototype.displayTimer = function() {
    this.countTime();
    textSize(20);
    textAlign(CENTER);
    fill('orange');
    text('Score: ' + this.score, width / 2, 50);
}

Game.prototype.drawBackground = function() {
    background('#111E6C');
    rectMode(CENTER);
    noStroke();
    fill('#000080');
    rect(width / 2, height / 2 + 35, 520, 520);
    rectMode(CORNER);
}