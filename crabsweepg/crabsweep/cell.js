let crabcrab;
let treetree;
let wavewave;

function preload() {
    crabcrab1 = loadImage('crab.png');
    crabcrab2 = loadImage('crab2.png');
    crabcrab3 = loadImage('crab3.png');
    crabcrab4 = loadImage('crab4.png');
    treetree = loadImage('tree2.png');
    wavewave = loadImage('wave2.png');
}

function Cell(i, j, l) {
    this.crabs = crabcrab[floor(random(4))];
    this.tree = treetree;
    this.wave = wavewave;
    this.i = i;
    this.j = j;
    this.x = (i * l) + 20;
    this.y = (j * l) + 90;
    this.l = l;
    this.crab = false
    this.reveal = false;
    this.flagged = false;
    this.amtCrabs;
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
        if (this.crab) {
            fill('#3fe0d0');
            rect(this.x, this.y, this.l, this.l);
            image(this.crabs, this.x, this.y, this.l, this.l);
        } else {
            fill('#3fe0d0');
            rect(this.x, this.y, this.l, this.l);
            fill('orange')
            textAlign(CENTER);
            textSize(28);
            if (this.amtCrabs > 0) {
                text(this.amtCrabs, this.x + this.l / 2, this.y + this.l / 2 + 10);
            }
        }
    }
}

Cell.prototype.reveals = function () {
    if (!gg) {
        if (!this.reveal) {
            revealCount++;
        }
        this.reveal = true;
        if (this.amtCrabs == 0) {
            this.chain();
        } else if (this.crab) {
            lose();
        } else if (revealCount + allCrabs == 100) {
            win();
        }
    }
}

Cell.prototype.chain = function () {
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if ((i > -1 && i < cols && j > -1 && j < rows)) {
                let neigh = grid[i][j];
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

Cell.prototype.countCrabs = function () {
    if (this.crab) {
        return;
    }
    let crabs = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            let i = this.i + xoff;
            let j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                let neigh = grid[i][j];
                if (neigh.crab) {
                    crabs++
                }
            }
        }
    }
    this.amtCrabs = crabs;
}

Cell.prototype.flag = function () {
    print('works');
    if (!this.reveal && !this.flagged && flagger.on) {
        this.flagged = true;
    } else if (this.flagged && flagger.on) {
        this.flagged = false;
    } else {
        this.reveals();
    }
    print(!this.reveal && !this.flagged && flagger.on);
    print(this.flagged);
}
