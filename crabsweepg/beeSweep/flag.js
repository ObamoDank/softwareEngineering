function Flagger(x, y, l) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.on = false;
}

Flagger.prototype.turnOn = function() {
    if (this.on) {
        this.on = false;
    } else {
        this.on = true;
    }
}

Flagger.prototype.show = function() {
    rectMode(CENTER);
    if (!this.on) {
        rect(this.x, this.y, this.l, this.l);
    } else {
        fill('#008e54');
        ellipse(this.x, this.y, this.l + 20);
        rect(this.x, this.y, this.l, this.l);
    }
    rectMode(CORNER);
}

Flagger.prototype.click = function() {
    console.log(this.x - this.l / 2);
    if (mouseX > this.x - this.l / 2 && mouseX < this.x + this.l / 2 && mouseY > this.y - this.l / 2 && mouseY < this.y + this.l / 2) {
        this.turnOn();
        print("Flagger on: " + this.on);
    }
}
