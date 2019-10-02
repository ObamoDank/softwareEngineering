function Button(x, y, l, w) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.w = w;
}

Button.prototype.show = function (c, outline) {
    fill(c);
    stroke(outline)
    rectMode(CENTER)
    rect(this.x, this.y, this.l, this.w, 20);
    rectMode(CORNER);
}

Button.prototype.text = function (size, text, c) {
    textAlign(CENTER);
    textSize(size);
    text(text, this.x, this.y);
}

Button.prototype.click = function () {
    return (x > this.x && x < this.x + this.l && y > this.y && y < this.y + this.l);
}


//    rect(width / 2, 130, 300, 50);
//    rect(width / 2, 230, 300, 50);
//    rect(width / 2, 330, 300, 50);
//    rect(width / 2, 430, 300, 50);
//    text('Play Standard', width / 2, 130);
//    text('Play Hex', width / 2, 230);
//    text('Play Colour', width / 2, 330);
//    text('Instructions', width / 2, 430);
