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

Game.prototype.makeField = function (Tile) {
    let field;
    if (Tile != Planet) {
        field = new Array(this.dimensions);
        for (let i = 0; i < field.length; i++) {
            field[i] = new Array(this.dimensions);
        }
    } else {
        field = new Array();
        for (let i = 0; i < this.dimensions; i++) {
            field[i] = new Array();
        }
    }
    return field;
}

Game.prototype.populateGrid = function (Tile) {
    this.grid = this.makeField(Tile);
    console.log(this.Tile)
    let xShift = false;
    for (let i = 0; i < this.dimensions; i++) {
        for (let j = 0; j < this.dimensions; j++) {
            if (Tile == Cell) {
                this.gridSize++;
                this.grid[i][j] = new Cell(i, j, 50);
            } else if (Tile == Hex) {
                if (!xShift) {
                    this.grid[j][i] = new Hex(j, i, 20, xShift);
                } else {
                    this.grid[j][i] = new Hex(j, i, 20, xShift);

                }
                xShift = !xShift;
                this.gridSize++;
            }
        }
    }
    if (Tile == Planet) {
        this.grid[0].push(new Planet(500, 0, 0, 0, [2, 0]));
        this.grid[0].push(new Planet(500, 60, 0, 1, [1, 4]));
        this.grid[0].push(new Planet(500, 120, 0, 2, [1, 3]));
        this.grid[0].push(new Planet(500, 180, 0, 3, [2, 1]));
        this.grid[0].push(new Planet(500, 240, 0, 4, [1, 1]));
        this.grid[0].push(new Planet(500, 300, 0, 5, [1, 1]));
        this.grid[1].push(new Planet(375, 70, 1, 0, [2, 2]));
        this.grid[1].push(new Planet(375, 140, 1, 1, [0, 5]));
        this.grid[1].push(new Planet(375, 210, 1, 2, [2, 3]));
        this.grid[1].push(new Planet(375, 280, 1, 3, [0, 2]));
        this.grid[1].push(new Planet(375, 350, 1, 4, [0, 1]));
        this.grid[2].push(new Planet(250, 90, 2, 0, [0, 0]));
        this.grid[2].push(new Planet(250, 180, 2, 1, [0, 3]));
        this.grid[2].push(new Planet(250, 270, 2, 2, [1, 0]));
        this.grid[2].push(new Planet(250, 360, 2, 3, [1, 2]));
        this.gridSize = 14;
    }
    console.log(this.grid)
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

Game.prototype.trimBombs = function () {
    console.log(this.grid);
    for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].setNeighbours();
            this.grid[i][j].countBombs();
        }
    }
    if (this.allBombs % 2 == 1) {
        this.allBombs--;
    }
    this.allBombs /= 2;
    console.log(this.allBombs);
}

Game.prototype.reset = function (Tile) {
    this.grid;
    this.gg = false;
    this.score = 0;
    this.start = false;
    this.revealCount = 0;
    this.gridSize = 0;
    console.log(Tile);

    this.populateGrid(Tile);
    console.log(Tile);
    if (Tile != Planet) {
        this.plantBombs();
    } else {
        this.allBombs = 0;
        this.trimBombs();
    }
}
