function Button(x, y, l, w, cmnd) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
    this.cmnd = cmnd;
}

Button.prototype.show = function (c, outline, size, txt, txtC) {
    fill(c);
    stroke(outline)
    rectMode(CENTER)
    rect(this.x, this.y, this.l, this.w, 20);
    rectMode(CORNER);
    textAlign(CENTER);
    textSize(size);
    fill(txtC);
    stroke(txtC)
    text(txt, this.x, this.y + 8);
}

Button.prototype.click = function (x, y) {
    return (x > this.x - this.l / 2 && x < this.x + this.l / 2 && y > this.y - this.w / 2&& y < this.y + this.w / 2/ 2);
}

Button.prototype.command = function (Tile) {
    if (this.cmnd == 0) {
        goToLanding(Tile);
    } else if (this.cmnd == 1) {
        goToStandard();
    } else if (this.cmnd == 2) {
        goToHex();
    } else if (this.cmnd == 3) {
        goToPlanet();
    } else {
        if (Tile == Cell) {
            standard.reset(Cell);
        } else if (Tile == Hex) {
            hexGame.reset(Hex);
        } else {
            planetGame.reset(Planet);
        }
    }
}