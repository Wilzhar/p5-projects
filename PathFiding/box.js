class Box {
    constructor(position, width, height, type, stroke, i, j) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.fill = color(0);
        this.stroke = stroke;
        this.type = type;
        this.state = StateBox.NEUTRO;
        this.i = i;
        this.j = j;
        this.gCost; // costo desde el inicio
        this.hCost; // costo de hasta el final(END)
        this.fCost; // costo Total   
        this.nucleusBox;
        this.stored = {
            type: -1,
            state: -1
        };
    }

    show() {

        // Si NO ha cambiado tipo Y NO ha cambiado estado, sale
        if (this.cambioTipo() || this.cambioEstado()) {
            // Actualizo los estados almacenados
            this.stored.type = this.type;
            this.stored.state = this.state;

            this.definirFill();
            strokeWeight(1);
            stroke(this.stroke);
            fill(this.fill);
            rect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    forceShow() {
        this.definirFill();
        strokeWeight(1);
        stroke(this.stroke);
        fill(this.fill);
        rect(this.position.x, this.position.y, this.width, this.height);
    }

    definirCostoG() {

        if (this.type == TypeBox.START) {
            this.gCost = 0;
        } else if (this.nucleusBox != null) {
            let distance = dist(this.nucleusBox.position.x, this.nucleusBox.position.y, this.position.x, this.position.y);
            this.gCost = this.nucleusBox.gCost + distance;
        }
    }

    definirCostoF() {
        if (this.gCost != null && this.hCost != null) {
            this.fCost = this.gCost + this.hCost;
        }
    }

    definirCostoH() {
        let centerBox = createVector(this.position.x + (anchoBox / 2), this.position.y + (altoBox / 2));
        let centerEndBox = createVector(end.position.x + (anchoBox / 2), end.position.y + (altoBox / 2));
        if (radio.value() == 1) {
            this.hCost = manhattanDist(centerBox, centerEndBox);
        } else {
            this.hCost = euclideanDist(centerBox, centerEndBox);
        }
    }

    cambioTipo() {
        return this.type != this.stored.type;
    }

    cambioEstado() {
        return this.state != this.stored.state;
    }

    definirFill() {
        if (this.state == StateBox.NEUTRO) {
            switch (this.type) {
                case TypeBox.START:
                    this.fill = color(0, 255, 0) // start : green
                    break;

                case TypeBox.END:
                    this.fill = color(255, 0, 0) // end : red
                    break;

                case TypeBox.PATH:
                    this.fill = color(255) // path : white
                    break;

                case TypeBox.WALL:
                    this.fill = color(100) // wall : gray
                    break;
            }
        } else {
            switch (this.state) {
                case StateBox.OPEN:
                    if (this.type != TypeBox.START) {
                        this.fill = color("LightPink");
                    } else {
                        this.fill = color(0, 255, 0) // start : green
                    }
                    break;

                case StateBox.CLOSE:
                    if (this.type != TypeBox.START) {
                        this.fill = color("HotPink");
                    } else {
                        this.fill = color(0, 255, 0) // start : green
                    }
                    break;
            }
        }
    }
}