class Curve {
    constructor(x, y, radio) {
        this.wave = [];
        this.radio = radio;
        this.angle = 0;
        this.x = x;
        this.y = y;

        this.point = {
            x: 0,
            y: 0
        };
    }

    updatePoint(ratio = 0) {


        let _angle = angle;
        noFill();
        strokeWeight(1);
        stroke(150, 255);
        ellipse(this.x, this.y, this.radio);

        _angle *= ratio + 1;

        let px = this.radio / 2 * cos(_angle);
        let py = this.radio / 2 * sin(_angle);

        px += this.x;
        py += this.y;

        this.point.x = px;
        this.point.y = py;

        strokeWeight(5);
        stroke(255, 255);
        point(this.point.x, this.point.y);
    }

    show() {
        stroke(255, 100);
        strokeWeight(2);
        noFill();
        beginShape();
        this.wave.forEach(function (point) {
            vertex(point.x, point.y);
        });
        endShape();
    }

    addPoint(point) {

        this.wave.push(point);

    }
}