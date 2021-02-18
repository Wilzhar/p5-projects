var boxes; // arreglo bidimensional o matriz
var filas; // int
var columnas; // int
var anchoBox; // int
var start; // Object class Box
var end; // Object class Box
var firstClick; // boolean
var latestType; // Object Type TypeBox
var firstBoxPosition; // Object class Box
var isPathOrWall; // boolean
var pathFinding;
var founded;
var runningSearch;
var radio;
var buttonStart;
var buttonRemoveWall;

function setup() {
	// crea un lienzo
	createCanvas(500, 500);
	// definir el color del fondo
	background(0);

	// definir el ancho y alto de la caja o cuadricula
	anchoBox = 5;
	altoBox = 5;

	// centinela para detectar el primer click del mouse hasta q lo suelta
	firstClick = true;
	// centinela para detectar si la caja actual es un camino o pared
	isPathOrWall = false;
	founded = false;
	runningSearch = false;




	// guarda el tipo de la primera caja al hacer el firstClick
	latestType = TypeBox.PATH;

	// define el numero de filas y columnas dependiendo del ancho y alto de canvas y de las cajas
	filas = floor(height / altoBox);
	columnas = floor(width / anchoBox);


	resizeCanvas((columnas * anchoBox), (filas * altoBox));
	background(225);

	buttonStart = createButton("Start Search");
	buttonStart.position(width + 25, 10);
	buttonStart.size(100, 40);
	buttonStart.mousePressed(startSearch)

	buttonRemoveWall = createButton("Remove Wall");
	buttonRemoveWall.position(width + 25, 55);
	buttonRemoveWall.size(100, 40);
	buttonRemoveWall.mousePressed(removeWall);

	radio = createRadio();
	radio.option('Manhattan', 1);
	radio.option('Euclidean', 2);
	radio.style('width', '60px');
	radio.position(width + 25, 150);
	textAlign(CENTER);
	fill(255, 0, 0);

	//genera un matriz de cajas
	boxes = new Array(filas);

	posBoxX = 0;
	posBoxY = 0;

	for (i = 0; i < filas; i++) {
		boxes[i] = new Array(columnas);
		for (j = 0; j < columnas; j++) {
			boxes[i][j] = new Box(createVector(posBoxX, posBoxY, 0), anchoBox, altoBox, TypeBox.PATH, color(200), i, j);
			boxes[i][j].show();
			posBoxX += anchoBox;
		}
		posBoxY += altoBox;
		posBoxX = 0;
	}

	//fija el punto de partida y de final
	start = boxes[0][0];
	end = boxes[filas - 1][columnas - 1];
	start.type = TypeBox.START;
	end.type = TypeBox.END;

	boxes[0][0] = start;
	boxes[filas - 1][columnas - 1] = end;

	let fxn = function (box) {
		box.show();
	}

	loopEach(fxn);
}

function draw() {
	if (pathFinding != null) {
		pathFinding.search();
	}
	//	si esta presionando el mouse
	if (mouseIsPressed) {
		if (!runningSearch) {
			checkBoxMousePosition();
		}
	}
}

function mouseReleased() {
	getBoxPositionFromMouse();
	end.forceShow();
	firstClick = true;
}

function getBoxPositionFromMouse() {
	var dato = {
		posI: 0,
		posJ: 0,
	};

	// Me da la posicion de la caja en la matriz donde esta actualmente posicionado el mouse según su ejeX(mouseX) y ejeY(mouseY)
	dato.posI = floor(mouseY / altoBox);
	dato.posJ = floor(mouseX / anchoBox);

	// Para evitar que se desborde de la matriz
	if (!(dato.posI >= 0 && dato.posI < filas && dato.posJ >= 0 && dato.posJ < columnas)) {
		dato.posI = -1;
		dato.posJ = -1;
	}

	return dato;
}

function checkBoxMousePosition() {
	let boxPosition = getBoxPositionFromMouse();
	//	Valida que este en una posicion dentro de la matriz
	if (boxPosition.posI != -1) {
		//	Obtiene la caja de la matriz en la posicion del mouse según el resultado del metodo "getBoxPositionFromMouse()"
		let currentBox = boxes[boxPosition.posI][boxPosition.posJ];

		//	firstClick
		//	Verifica es el primer click para asegurarse que solo repita este paso una sola vez mientras se mantiene presionado el mouse
		if (firstClick) {
			//	Si la caja actual no es ni la de partida (TypeBox.START) ni la de fin (TypeBox.END)
			if (currentBox != start && currentBox != end) {
				//	Obtiene el tipo a pintar, es decir, si es un camino obtiene paredes y viceversa
				latestType = currentBox.type == TypeBox.PATH ? TypeBox.WALL : TypeBox.PATH;
				//	Dice que la casilla actual seleccionada es un camino o una pared
				isPathOrWall = true;
			} else if (currentBox == start || currentBox == end) //si la caja actual es la de partida (TypeBox.START) o la de fin (TypeBox.END)
			{
				//Obtiene la ultima posicion de la caja(ya sea inicio o fin) 
				firstBoxPosition = currentBox;
				//	Fice que la casilla actual seleccionada no es un camino ni una pared
				isPathOrWall = false;
			}
			//	De asegura que el proceso del primer click termino para no volver a repetir este paso hasta que levante el click 
			//	y lo vuelva a oprimir
			firstClick = false;
		}

		//	Si la caja actual es una pared (TypeBox.WALL) O UN camino (TypeBox.PATH)
		if (isPathOrWall) {
			//	Para no poder interactuar con el inicio o fin, mientras este interactuando con una pared o camino
			if (currentBox.type != TypeBox.END && currentBox.type != TypeBox.START) {
				//	La casilla actual la cambia por ya sea una pared o camino segun lo obtenido en el fisrtClick
				currentBox.type = latestType;
			}
		} else // De lo contrario
		{
			//	Si la caja actual es un camino para poder mover ya sea el punto de inicio o fin
			if (firstBoxPosition != currentBox && currentBox.type == TypeBox.PATH) {
				//	Intercambia los tipos de la caja de la actual(currentBox) 
				//		y la ultima posicion guardada de el inicio o fin 
				//		según la que este actualmente moviendo
				let typeAux = firstBoxPosition.type;
				firstBoxPosition.type = TypeBox.PATH;
				currentBox.type = typeAux;
				firstBoxPosition.show();

				//	Redefine la cajas de incio y fin
				if (typeAux == TypeBox.START) {
					start = currentBox;
				}
				if (typeAux == TypeBox.END) {
					end = currentBox;
				}

				//	Guarda la nueva posicion de la caja según a la cual la haya movido
				firstBoxPosition = currentBox;
			}
		}
		//	 Muestra la caja actual
		currentBox.show();
	}

}

function startSearch() {
	if (founded) {
		end.forceShow();
		restartSearch();
	}
	// if (!runningSearch) {
	runningSearch = true;
	definirCostosH();
	pathFinding = new PathFinding();
	// } else {
	// 	pathFinding.search();
	// 	pathFinding.drawLine();
	// }
}

function removeWall() {
	let fxn = function (box) {
		if (box.type != TypeBox.START && box.type != TypeBox.END) {
			box.type = TypeBox.PATH;
		}
	}
	loopEach(fxn);
	restartSearch();
}

function mouseClicked() {
	// if (founded) {
	// 	restartSearch();
	// }

	let boxPosition = getBoxPositionFromMouse();
	//	Valida que este en una posicion dentro de la matriz
	if (boxPosition.posI != -1) {
		//	Obtiene la caja de la matriz en la posicion del mouse según el resultado del metodo "getBoxPositionFromMouse()"
		let currentBox = boxes[boxPosition.posI][boxPosition.posJ];
		console.log("gCost", currentBox.gCost, "hCost", currentBox.hCost, "fCost", currentBox.fCost);
	}

}


function restartSearch() {
	founded = false;
	frameRate(60);
	pathFinding = null;

	let fxn = function (box) {
		box.gCost = null;
		box.hCost = null;
		box.fCost = null;
		box.nucleusBox = null;
		box.state = StateBox.NEUTRO;
		box.show();
	}

	loopEach(fxn);
}

function loopEach(fxn) {
	for (let i = 0; i < filas; i++) {
		for (let j = 0; j < columnas; j++) {
			fxn(boxes[i][j]);
		}
	}
}

function definirCostosH() {
	let fxn = function (box) {
		box.definirCostoH();
		box.show();
	}

	loopEach(fxn);
}

function euclideanDist(a, b) {
	let distance = dist(a.x, a.y, b.x, b.y);
	return distance;
}

function manhattanDist(a, b) {
	return abs(a.x - b.x) + abs(a.y - b.y);
}

