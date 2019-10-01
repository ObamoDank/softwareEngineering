function Flagger(x, y, l, pic) {
    this.img = pic;
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
    imageMode(CENTER);
    if (!this.on) {
        image(this.img, this.x, this.y, this.l, this.l);
    } else {
        fill('#008e54');
        ellipse(this.x, this.y, this.l + 20);
        image(this.img, this.x, this.y, this.l, this.l);
    }
    imageMode(CORNER);
}

Flagger.prototype.click = function() {
    if (mouseX > this.x - this.l / 2 && mouseX < this.x + this.l / 2 && mouseY > this.y - this.l / 2 && mouseY < this.y + this.l / 2) {
        this.turnOn();
        print("Flagger on: " + this.on);
    }
}
