function Cell(i, j, l) {
    this.crabs = crabcrab;
    this.tree = treetree;
    this.wave = wavewave;
    this.i = i;
    this.j = j;
    this.x = (i * l) + 20;
    this.y = (j * l) + 90;
    this.l = l;
    this.bomb = false
    this.reveal = false;
    this.flagged = false;
    this.amtBombs;
}

Cell.prototype.show = function () {
    fill('#1034a6');
    stroke('#f05e23');
    rect(this.x, this.y, this.l, this.l);
    image(this.wave, this.x, this.y, this.l, this.l);

    if (this.flagged) {
        fill('#1034a6');
        rect(this.x, this.y, this.l, this.l);
        image(this.tree, this.x, this.y, this.l, this.l);

    }
    if (this.reveal) {
        if (this.bomb) {
            fill('#008ecc');
            rect(this.x, this.y, this.l, this.l);
            image(this.crabs, this.x, this.y, this.l, this.l);
        } else {
            fill('#008ecc');
            rect(this.x, this.y, this.l, this.l);
            fill('orange')
            textAlign(CENTER);
            textSize(28);
            if (this.amtBombs > 0) {
                text(this.amtBombs, this.x + this.l / 2, this.y + this.l / 2 + 10);
            }
        }
    }
}

Cell.prototype.reveals = function () {
    if (!standard.gg) {
        if (!this.reveal) {
            standard.revealCount++;
        }
        this.reveal = true;
        if (this.amtBombs == 0) {
            this.chain();
        } else if (this.bomb) {
            standard.lose();
        } else if (standard.revealCount + standard.allBombs == 100) {
            standard.win();
        }
    }
}

Cell.prototype.chain = function () {
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if ((i > -1 && i < standard.dimensions && j > -1 && j < standard.dimensions)) {
                let neigh = standard.grid[i][j];
                if (neigh.reveal == false) {
                    neigh.reveals();
                }
            }
        }
    }
}

Cell.prototype.click = function (x, y) {
    return (x > this.x && x < this.x + this.l && y > this.y && y < this.y + this.l);
}

Cell.prototype.countBombs = function () {
    if (this.bomb) {
        return;
    }
    let bombs = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if (i > -1 && i < standard.dimensions && j > -1 && j < standard.dimensions) {
                let neigh = standard.grid[i][j];
                if (neigh.bomb) {
                    bombs++
                }
            }
        }
    }
    this.amtBombs = bombs;
}

Cell.prototype.flag = function () {
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
