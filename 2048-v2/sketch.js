var canvasHeight = 500;
var canvasWidth = 500;
var boxes;
var rows = 4;
var cols = 4;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	background(153);
	generateMatrix(rows, cols);
	generateLogicMatrix(rows, cols);
	// generateRandomValue(2);
	generateMatrixPrototype();
	showBlocks();

}

function draw() {

}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		moveLeft();
		paintCanvas();
		showBlocks();
	}
}

function generateMatrixPrototype() {
	logicMatrix =
		[[4, 4, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]]
}

function generateMatrix(rows, cols) {
	boxes = new Array(rows);

	boxWidth = canvasWidth / cols;
	boxHeight = canvasHeight / rows;

	posBoxX = 0;
	posBoxY = 0;

	for (i = 0; i < rows; i++) {
		boxes[i] = new Array(cols);
		for (j = 0; j < cols; j++) {
			boxes[i][j] = new Box(createVector(posBoxX, posBoxY, 0), i, j, boxWidth, boxHeight);
			posBoxX += boxWidth;
		}
		posBoxY += boxHeight;
		posBoxX = 0;
	}
}

function showBlocks() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			boxes[i][j].show(logicMatrix[i][j])
		}
	}
}


function paintCanvas() {
	background(153);
}

