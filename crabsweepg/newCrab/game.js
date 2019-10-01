function Game(dimensions, bombs) {
    this.dimensions = dimensions;
    this.l = 50;
    this.grid;
    this.allBombs = bombs;
    this.gg = false;
    this.score = 0;
    this.start = false;
    this.revealCount = 0;
    this.gridSize = 0;
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
    let xShift = false;
    for (let i = 0; i < this.dimensions; i++) {
        for (let j = 0; j < this.dimensions; j++) {
            if (Tile == Cell) {
                this.gridSize++;
                this.grid[i][j] = new Cell(i, j, 50);
            } else {
                if (!xShift) {
                    this.grid[j][i] = new Hex(j, i, 20, xShift);
                } else {
                    this.grid[j][i] = new Hex(j, i, 20, xShift);

                }
                xShift = !xShift;
                this.gridSize++;
                console.log(this.gridSize);
            }
        }
    }
}


Game.prototype.plantBombs = function () {
    let options = [];
    for (var i = 0; i < this.dimensions; i++) {
        for (var j = 0; j < this.dimensions; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < this.allBombs; n++) {
        let index = floor(random(options.length));
        let choice = options[index];
        let i = choice[0];
        let j = choice[1];
        options.splice(index, 1);
        this.grid[i][j].bomb = true;
    }

    for (let i = 0; i < this.dimensions; i++) {
        for (let j = 0; j < this.dimensions; j++) {
            this.grid[i][j].countBombs();
        }
    }
}

Game.prototype.lose = function () {
    for (let i = 0; i < this.dimensions; i++) {
        for (let j = 0; j < this.dimensions; j++) {
            let gameCount = this.grid[i][j];
            if (!gameCount.reveal && gameCount.bomb) {
                gameCount.reveal = true;
            }
        }
        this.gg = true;
        this.score = 'You Lose';
    }
}

Game.prototype.win = function () {
    this.gg = true;
    this.score = 'Congratz, your score is ' + this.score;
}

Game.prototype.countTime = function () {
    if (!this.gg && this.start) {
        if (frameCount % 60 == 0) {
            this.score++;
        }
    }
}

Game.prototype.displayTimer = function (colour, outline, size) {
    this.countTime();
    textSize(size);
    textAlign(CENTER);
    fill(colour);
    stroke(outline);
    text('Score: ' + this.score, width / 2, 50);
}
