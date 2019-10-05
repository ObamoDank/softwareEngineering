function Planet(r, angle, i, j, neighbour) {
    this.x;
    this.y;
    this.i = i;
    this.j = j;
    this.l = random(60, 40);
    this.r = r;
    this.angle = angle;
    this.reveal = false;
    this.flagged = false;
    this.neighbours = [];
    this.neighbours.push(neighbour);
    this.type = floor(random(1, 6));
    this.bomb;
}

Planet.prototype.show = function () {
    imageMode(CENTER);
    fill("rgba(0, 0, 0, 0.7)");
    stroke("rgba(128, 0, 128, 0.2)");
    line(this.x, this.y, planetGame.grid[this.neighbours[0][0]][this.neighbours[0][1]].x, planetGame.grid[this.neighbours[0][0]][this.neighbours[0][1]].y);
    ellipse(this.x, this.y, this.l, this.l);
    if (this.flagged) {
        ellipse(this.x, this.y, this.l);
        image(hole, this.x, this.y, this.l, this.l);
    }
    if (this.reveal) {
        ellipse(this.x, this.y, this.l);
        if (this.type == 1) {
            image(heart, this.x, this.y, this.l, this.l);
        } else if (this.type == 2) {
            image(water, this.x, this.y, this.l, this.l);
        } else if (this.type == 3) {
            image(wind, this.x, this.y, this.l, this.l);
        } else if (this.type == 4) {
            image(eart, this.x, this.y, this.l, this.l);
        } else {
            image(fire, this.x, this.y, this.l, this.l);

        }
    }
    if (this.bomb) {
        noFill()
        stroke('white');
        line(this.x, this.y, planetGame.grid[this.bomb[0]][this.bomb[1]].x, planetGame.grid[this.bomb[0]][this.bomb[1]].y);
        ellipse(this.x, this.y, this.l);
        ellipse(planetGame.grid[this.bomb[0]][this.bomb[1]].x, planetGame.grid[this.bomb[0]][this.bomb[1]].y, planetGame.grid[this.bomb[0]][this.bomb[1]].l);
    }
}

Planet.prototype.rotate = function () {
    angleMode(DEGREES);
    let centreX = width / 2;
    let centreY = height / 2 + 30;
    let radius = this.r / 2;
    let x = radius * cos(this.angle);
    let y = radius * sin(this.angle);
    if (this.i == 1) {
        this.x = centreX - x;
    } else {
        this.x = centreX + x;
    }
    this.y = centreY + y;
    this.angle += 0.25;
}

Planet.prototype.click = function (x, y) {
    let d = dist(this.x, this.y, x, y)
    return (d < this.l / 2);
}

Planet.prototype.setNeighbours = function () {
    if (this.j == 0) {
        this.neighbours.push([this.i, planetGame.grid[this.i].length - 1], [this.i, this.j + 1]);
    } else if (this.j == planetGame.grid[this.i].length - 1) {
        this.neighbours.push([this.i, this.j - 1], [this.i, 0]);
    } else {
        this.neighbours.push([this.i, this.j - 1], [this.i, this.j + 1])
    }
}

Planet.prototype.countBombs = function () {
    for (let i = 0; i < this.neighbours.length; i++) {
        if (this.type == planetGame.grid[this.neighbours[i][0]][this.neighbours[i][1]].type) {
            planetGame.allBombs++;
        }
    }
}

Planet.prototype.checkNeighbours = function () {
    for (let i = 0; i < this.neighbours.length; i++) {
        if (this.type == planetGame.grid[this.neighbours[i][0]][this.neighbours[i][1]].type && this.reveal && planetGame.grid[this.neighbours[i][0]][this.neighbours[i][1]].reveal) {
            this.bomb = this.neighbours[i];
            planetGame.lose();
        }
    }
}

Planet.prototype.reveals = function () {
    if (!planetGame.gg) {
        if (!this.reveal) {
            planetGame.revealCount++;
        }
        this.reveal = true;
        this.checkNeighbours();
        if (planetGame.revealCount + planetGame.allBombs == planetGame.gridSize && planetGame.score != 'You Lose') {
            planetGame.win();
        }
    }
}

Planet.prototype.flag = function () {
    if (!this.reveal && !this.flagged && flagger.on) {
        this.flagged = true;
    } else if (this.flagged && flagger.on) {
        this.flagged = false;
    } else {
        if (!this.flagged) {
            this.reveals();
        }
    }
}
