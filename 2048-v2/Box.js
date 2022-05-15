class Box {
    constructor(position, i, j, width, height) {
        this.position = position;
        this.i = i;
        this.j = j;
        this.width = width;
        this.height = height;
    }

    show(value) {
        strokeWeight(1);
        stroke(200);
        fill(150, 150, 150);
        rect(this.position.x, this.position.y, this.width, this.height);
        stroke(170, 122, 120);

        if (value != 0) {
            fill(150, 102, 100);
            textSize(32);
            textAlign(CENTER, CENTER)
            text(value, this.position.x + (this.width / 2), this.position.y + (this.height / 2));
        }
    }
}