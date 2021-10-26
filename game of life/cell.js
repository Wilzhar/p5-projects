const State = {
    MUERTA: 0,
    VIVA: 1,
}

class Cell {
    constructor(position, i, j, state, size) {
        this.position = position;
        this.i = i;
        this.j = j;
        this.state = state;
        this.color;
        this.size = size;
    }

    show(oldState) {
        if (this.state != oldState) {
            this.setFill();
            stroke(100);
            fill(this.color);
            rect(this.position.x, this.position.y, this.size.w, this.size.h);
        }
    }

    setFill() {
        switch (this.state) {
            case State.VIVA:
                this.color = color("White");
                break;
            case State.MUERTA:
                this.color = color("Black");
                break;
        }
    }
}