var arreglo;
var start = false;
var ini = 0;
var piv;
var fin;
var state;
var menores;
var mayores;
var index;
var jIndex;
var prevState = -1;
var limites = [];
var complete = false;

var colorPorFase;
var quickSort;

let array = [7, 3, 6, 2, 1, 0, 5, 8, 9];

const State = {
	START: 0,
	PHASE_1: 1,
	PHASE_2: 2,
	PHASE_3: 3,
	END_PHASE: 4,
	COMPLETE: 5,
}

function setup() {

	colorPorFase = color('black');
	createCanvas(1200, 600);
	background(255);
	arreglo = [];
	menores = [];
	mayores = [];


	for (let i = 0; i < width; i++) {
		arreglo.push(Math.floor(random(0, height)));
	}
	// for (let i = 0; i < width; i++) {
	// 	let rand = pow(random(0, 1), 2);
	// 	let num = rand * height;
	// 	num = constrain(num, 1, height);
	// 	console.log(num);
	// 	arreglo.push(num);

	// 	}
	//quickSort(0, arreglo.length - 1);
	fin = arreglo.length - 1;

	state = State.START;

	// quickSort = new QuickSort(arreglo);
	// quickSort.sort();
	// console.log(quickSort);
}

function draw() {
	background(255);

	if (!complete) {
		for (let i = 0; i < ini; i++) {
			stroke(colorPorFase);
			line(i, height, i, height - arreglo[i]);
		}

		for (let i = ini; i < fin; i++) {
			stroke(color(30, 80, 50));
			line(i, height, i, height - arreglo[i]);
		}

		for (let i = fin; i < arreglo.length; i++) {
			stroke(colorPorFase);
			line(i, height, i, height - arreglo[i]);
		}
	} else {
		for (let i = 0; i < arreglo.length; i++) {
			stroke(colorPorFase);
			line(i, height, i, height - arreglo[i]);
		}
	}

	if (limites.length > 0) {
		if (complete) {
			ordenar(limites, 0, limites.length - 1);
			complete = false;
			let limite = limites.pop();
			ini = limite.min;
			fin = limite.max;
			state = State.START;
		}
	}
	procesar();
	
}

function obtenerColorAlAzar() {

	colorMode(HSB, 100);

	// return color(round(random(0, 100)), 80, 80);
	return color(30, 80, 80);


}

function cambioEstado() {

	if (prevState != state) {
		prevState = state;
		return true;
	} else {
		return false;
	}

}

function ordenar(arreglo, ini, fin) {
	// Si el arreglo tiene dos o más elementos y el inicio es menor al final
	if (arreglo.length >= 2 && ini < fin) {
		// Si el arreglo limitado en ini fin, tiene solo dos elementos
		if (fin - ini == 1) {

			// Si el primer elemento es mayor al segundo
			if (arreglo[ini].min < arreglo[fin].min) {
				// Primer elemento en el arreglo
				let aux = arreglo[ini];

				// intercambia el primer con el segundo elemento, si procede
				arreglo[ini] = arreglo[fin];
				arreglo[fin] = aux;
			}
		} else {
			// defino dos arreglos para la division de los numeros
			let menores = [];
			let mayores = [];
			// Selecciona un elemento de pivote
			let piv = fin;

			// define el elemento posicion pivote
			let elementPiv = arreglo[piv];

			// Recorro entre los limites
			for (let i = ini; i < fin; i++) {
				// Si el elemento i es mayor al elemento pivote
				if (arreglo[i].min <= arreglo[piv].min) {
					// El elemento i es agregado a la lista de elementos menores
					menores.push(arreglo[i]);
				} else if (arreglo[i].min > arreglo[piv].min) { // Si el elemento i es menor al elemento pivote
					// El elemento i es agregado a la lista de elementos mayores
					mayores.push(arreglo[i]);
				}
			}

			// Recorro la longitud de los menores
			for (let i = 0; i < mayores.length; i++) {
				// Sobrescribo los datos del arreglo original a partir del limite inferior
				arreglo[ini + i] = mayores[i];
			}

			// Defino la nueva posicion del pivote
			piv = ini + mayores.length;
			arreglo[piv] = elementPiv;

			// Recorro el arreglo de los elementos mayores
			for (let i = 0; i < menores.length; i++) {
				// Sobrescribo en la lista los elementos mayores
				let longitudMenores = ini + mayores.length;
				arreglo[longitudMenores + i + 1] = menores[i];
			}

			// Defino los nuevos limites del arreglo, con los elementos menores al pivote;
			ordenar(arreglo, ini, piv - 1);
			// Lo mismo pero con los elementos mayores
			ordenar(arreglo, piv + 1, fin);

			// Retorno el nuevo arreglo
		}
	}
}




function procesar() {
	// Si tiene más de dos elementos e inicio es menor que fin
	if (arreglo.length >= 2 && ini < fin) {
		// Evalue el estado
		switch (state) {
			case State.START:
				if (cambioEstado())
					colorPorFase = obtenerColorAlAzar();
				menores.length = 0;
				mayores.length = 0;
				piv = fin;
				elementPiv = arreglo[piv];
				for (let i = ini; i < fin; i++) {
					if (arreglo[i] <= arreglo[piv]) {
						menores.push(arreglo[i]);
					} else if (arreglo[i] > arreglo[piv]) {
						mayores.push(arreglo[i]);
					}
				}
				state = State.PHASE_1;
				index = 0;
				jIndex = mayores.length - 1;
				break;

			case State.PHASE_1:
				if (cambioEstado())
					colorPorFase = obtenerColorAlAzar();

				
				if(menores.length < mayores.length)
				{
					let rel = floor(mayores.length / menores.length);
					if((jIndex + 1) % rel == 0)
					{
						if(index < menores.length)
						{
							arreglo[ini + index] = menores[index];
							index++;
						}
					}
					
					if (jIndex >= 0) {
						arreglo[ini + menores.length + jIndex + 1] = mayores[jIndex];
						showLine(ini + menores.length + jIndex + 1, 0);
						showLine(ini + index, 0);
						jIndex--;
					}
				}
				else
				{
					let rel = floor(menores.length / mayores.length);
					if((index + 1) % rel == 0)
					{
						if (jIndex >= 0) {
							arreglo[ini + menores.length + jIndex + 1] = mayores[jIndex];
							jIndex--;
						}
					}
					if(index < menores.length)
					{
						arreglo[ini + index] = menores[index];
						showLine(ini + menores.length + jIndex + 1, 0);
						showLine(ini + index, 0);
						index++;
					}
					
				}
				// if (index < menores.length) {
				// 	arreglo[ini + index] = menores[index];
				// 	showLine(ini + index, 0);
				// 	index++;
				// }
				// // } else {
				// // 	state = State.PHASE_2;
				// // }

				// if (jIndex >= 0) {
				// 	arreglo[ini + menores.length + jIndex + 1] = mayores[jIndex];
				// 	showLine(ini + menores.length + jIndex + 1, 0);
				// 	jIndex--;
				// }

				if(index >= menores.length && jIndex < 0)
				{
					state = State.PHASE_2;
				}
				break;

			case State.PHASE_2:
				if (cambioEstado())
					colorPorFase = obtenerColorAlAzar();

				piv = ini + menores.length;

				arreglo[piv] = elementPiv;
				showLine(piv, 0);
				state = State.PHASE_3;
				index = 0;
				jIndex = 0;

				let limite = {
					min: piv + 1,
					max: fin,
				};
				limites.unshift(limite);
				fin = piv - 1;
				state = State.END_PHASE;
				break;

			case State.PHASE_3:
				if (cambioEstado())
					colorPorFase = obtenerColorAlAzar();

				// if (index < mayores.length) {
				// 	arreglo[ini + menores.length + index + 1] = mayores[index];
				// 	showLine(ini + menores.length + index + 1, 0);
				// 	index++;
				// } else {
					// let limite = {
					// 	min: piv + 1,
					// 	max: fin,
					// };
					// limites.unshift(limite);
					// fin = piv - 1;
					// state = State.END_PHASE;
				// }
				break;

			case State.END_PHASE:
				if (cambioEstado())
					colorPorFase = obtenerColorAlAzar();
				if (fin - ini == 1) {
					if (arreglo[ini] > arreglo[fin]) {
						let aux = arreglo[ini];
						arreglo[ini] = arreglo[fin];
						arreglo[fin] = aux;
						showLine(ini, 0);
						showLine(fin, 0);
					}
					state = State.COMPLETE;

				} else {
					state = State.START;
				}
				break;

			case State.COMPLETE:
				complete = true;
				break;

		}
		// console.log(Object.keys(State)[state]);
	} else {
		complete = true;
	}
}

function showLine(i, color) {
	stroke(color);
	line(i, height, i, height - arreglo[i]);
}

/// Quick Sort

QuickSort = function (arreglo) {

	const Estado = {
		NINGUNO: 0,
		INICIO: 1,
		PROCESO: 2,
		FINAL: 3
	}

	this.currentState = Estado.NINGUNO;

	this.stored

	this.arreglo = arreglo;

	this.limiteMin;
	this.limiteMax;
}

QuickSort.prototype.sort = function () {


	this.arreglo;

	// el arreglo tiene más de un elemento
	if (this.arreglo.length > 1) {



	}


}