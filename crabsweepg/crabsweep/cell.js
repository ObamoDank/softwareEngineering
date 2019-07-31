let crabcrab;

function preload() {
    crabcrab = loadImage('crab.png');
}

function Cell(i, j, l) {
    this.img = crabcrab;
    this.i = i;
    this.j = j;
    this.x = i * l;
    this.y = j * l;
    this.l = l;
    this.crab = false
    this.reveal = false;
    this.amtCrabs;
}

Cell.prototype.show = function () {
    fill('#1034a6');
    stroke('#f05e23');
    rect(this.x, this.y, this.l, this.l);
    if (this.reveal) {
        if (this.crab) {
            fill('#3fe0d0');
            rect(this.x, this.y, this.l, this.l);
            image(this.img, this.x, this.y, this.l, this.l);
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
    this.reveal = true;
}

Cell.prototype.click = function (x, y) {
    return (x > this.x && x < this.x + this.l && y > this.y && y < this.y + this.l);
}

Cell.prototype.countCrabs = function () {
    if (this.crab) {
        return -1;
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


