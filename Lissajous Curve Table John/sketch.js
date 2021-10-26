var x = 0;
var y = 0;
var r = 50;

var angle = 0;

var ancho = 100;
var curves = [];


function setup() {
	createCanvas(600, 600);
	background(0);

	cols = floor(width / ancho);
	rows = floor(height / ancho);

	// resizeCanvas(cols * ancho, rows * ancho);
	curves = new Array(rows);
	for (let i = 0; i < rows; i++) {
		curves[i] = new Array(cols);
		for (let j = 0; j < cols; j++) {
			// console.log("x", j * ancho, "y", i * ancho)
			let current = new Curve(j * ancho + (ancho / 2), i * ancho + (ancho / 2), 9 * ancho / 10);
			curves[i][j] = current;
		}
	}
}

function draw() {
	background(0);


	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {

			if (x == 0 && y == 0) continue;

			let curve = curves[y][x];
			if (x == 0 || y == 0) {

				curve.updatePoint((x + y) * 1)

				strokeWeight(2);
				stroke(255, 50);
				if (x == 0) {
					line(0, curve.point.y, width, curve.point.y);
				} else if (y == 0) {
					line(curve.point.x, 0, curve.point.x, height);
				}

			} else {

				let top, bot;

				top = curves[0][x];
				bot = curves[y][0];

				curvePoint = {
					x: top.point.x,
					y: bot.point.y
				};

				stroke(255,255);
				strokeWeight(6);
				point(curvePoint.x, curvePoint.y);

				curve.addPoint(curvePoint);

				curve.show();
			}

		}
	}

	angle -= 0.05;

	// translate(width / 2, height / 2);
	// x = r * cos(3 * angle);
	// y = r * sin(1.3 * angle);
	// waves.push([x, y]);
	// stroke(255);
	// strokeWeight(2);
	// beginShape();
	// noFill(); 
	// for(wave of waves)
	// {
	// 	vertex(wave[0], wave[1]);
	// }
	// endShape();
	// strokeWeight(9);
	// let lastPoint = waves[waves.length - 1];
	// point(lastPoint[0], lastPoint[1]);
	// strokeWeight(1);
	// line(lastPoint[0], 0, lastPoint[0], height);
	// line(0, lastPoint[1], width, lastPoint[1]);
}