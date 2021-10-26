var altura;
var tamañoNodo;
var nNodosLvl;
var arbol;
var mostrar = 2;
var valores = [];
var cont = 0;

function setup() {
	arbol = new ArbolAVL();

	// arbol.agregar(7);
	// arbol.agregar(12);
	// arbol.agregar(10);
	// arbol.agregar(9);
	// arbol.agregar(8);
	// arbol.agregar(11);
	// arbol.agregar(13);
	// arbol.agregar(5);
	// arbol.agregar(6);
	// arbol.agregar(3);
	// arbol.agregar(4);
	// arbol.agregar(2);
	// arbol.agregar(1);

	// arbol.agregar(7);
	// arbol.agregar(2);
	// arbol.agregar(1);
	// arbol.agregar(4);
	// arbol.agregar(3);
	// arbol.agregar(5);
	// arbol.agregar(6);
	// arbol.agregar(9);
	// arbol.agregar(8);
	// arbol.agregar(11);
	// arbol.agregar(10);
	// arbol.agregar(12);
	// arbol.agregar(13);
	// arbol.agregar(6);
	// arbol.agregar(7);
	// arbol.agregar(2);
	// arbol.agregar(1);
	// arbol.agregar(4);
	// arbol.agregar(5);
	// arbol.agregar(3);

	// arbol.agregar(12);
	// arbol.agregar(17);
	// arbol.agregar(23);
	// arbol.agregar(18);
	// arbol.agregar(6);
	// arbol.agregar(8);
	// arbol.agregar(7);
	// arbol.agregar(11);
	// arbol.agregar(1);
	// arbol.agregar(3);
	// arbol.agregar(4); 
	// arbol.agregar(2);
	// arbol.agregar(10);

	// arbol.agregar(1);
	// arbol.agregar(2);
	// arbol.agregar(3);

	// arbol.agregar(16);
	// arbol.agregar(8);
	// arbol.agregar(24);
	// arbol.agregar(4);
	// arbol.agregar(12);
	// arbol.agregar(2);
	// arbol.agregar(1);
	// arbol.agregar(3);
	// arbol.agregar(1);
	// arbol.agregar(6);
	// arbol.agregar(5);
	// arbol.agregar(7);
	// arbol.agregar(10);
	// arbol.agregar(8);
	// arbol.agregar(9);
	// arbol.agregar(14);
	// arbol.agregar(13);
	// arbol.agregar(11);
	// arbol.agregar(15);
	// arbol.agregar(20);
	// arbol.agregar(28);
	// arbol.agregar(22);
	// arbol.agregar(26);
	// arbol.agregar(18);
	// arbol.agregar(17);
	// arbol.agregar(19);
	// arbol.agregar(21);
	// arbol.agregar(23);
	// arbol.agregar(25);
	// arbol.agregar(27);
	// arbol.agregar(30);
	// arbol.agregar(31);
	// arbol.agregar(29);
	
	// arbol.agregar(29.5);
	// arbol.agregar(30.5);
	// arbol.agregar(29.7);
	// arbol.agregar(30.3);
	// arbol.agregar(29.8);
	// arbol.agregar(30.2);
	// valores = [61, 91, 9, 90, 78, 84];
	// let nivel = arbol.contarHojas(arbol.getRaiz(), 0);
	// //console.log("hojas: " + nivel);
	tamañoNodo = 60;
	// arbol.eliminar(arbol.getRaiz(), null, false, null, 10);
	// arbol.eliminar(arbol.getRaiz(), null, false, null, 24);
	
	// arbol.imprimirArbol(arbol.getRaiz(), 0);
	altura = arbol.calcularAltura(arbol.getRaiz(), 0, 0);
	if(altura <= 0) altura = 3;
	// //console.log("iza:", arbol.getRaiz().getIzquierdo().getElemento());
	// test(arbol.getRaiz());
	createCanvas(pow(2, altura - 2) * (tamañoNodo + (tamañoNodo / 2)) , altura * tamañoNodo);
	background(100);
	//showArbol(arbol.getRaiz(), 0, "raiz", 1);
	showArbol(arbol.getRaiz(), 0, width, null);
	drawLines(arbol.getRaiz());
	showArbol(arbol.getRaiz(), 0, width, null);
	
}

function test(nodoActual) 
{
	if(nodoActual != null) 
	{
		//console.log("nodoActual: " + nodoActual.getElemento());
		if(nodoActual.getPadre() != null) 
		{
			//console.log("NodoPadre: " + nodoActual.getPadre().getElemento()); 
		}
		else 
		{
			//console.log("no existe su padre");
		}
		test(nodoActual.getIzquierdo());
		test(nodoActual.getDerecho());
	}
}

function drawLines(nodoActual)
{
	if(nodoActual != null)
	{
		nodoActual.drawLine();
		drawLines(nodoActual.getIzquierdo());
		drawLines(nodoActual.getDerecho())
	}
}

function showArbol(nodoActual, level, ancho, tipo) {

	if (nodoActual != null) 
	{
		nodoActual.radio = tamañoNodo / 2;
		let padre;
		switch (tipo) {
			default:
				nodoActual.x = ancho / 2;
				break;

				case "left":	
				padre = nodoActual.getPadre();
				// if(nodoActual.getElemento() == 1) //console.log("es 1: ", nodoActual.x, padre.x, ancho / 2);
				nodoActual.x = padre.x - ancho / 2;
				break;

			case "right":
				padre = nodoActual.getPadre();
				nodoActual.x = padre.x + ancho / 2;
				break;
		}
		
		nodoActual.y = tamañoNodo * level + tamañoNodo / 2;
		
		var nodoDerecho = nodoActual.getDerecho();
		var nodoIzquierdo = nodoActual.getIzquierdo();
		var nivelHijo = level + 1;

		nodoActual.show();

		showArbol(nodoIzquierdo, nivelHijo, ancho / 2, "left");
		showArbol(nodoDerecho, nivelHijo, ancho / 2, "right");
	}

}

/*
function showArbol(nodoActual, nivelActual, side, relativeWidth, posPadre) 
{
	/*
	if(nodoActual != null) 
	{
		let parts = pow(2, nivelActual);
		if(side == null)
		{
			nodoActual.x = (altura * scale);
			relative = (altura * scale);
		}
		else if(side == "izq")
		{
			nodoActual.x = relative - (relative / 2);
		}
		else
		{
			nodoActual.x = relative + (relative / 2);
		}
		nodoActual.y = (nivelActual * scale) + (scale / 2);
		nodoActual.radio = scale / 2;
		nodoActual.show();
		//console.log("relative", relative, "parts", parts);
		showArbol(nodoActual.getIzquierdo(), nivelActual + 1, "izq", relative / 2);
		showArbol(nodoActual.getDerecho(), nivelActual + 1, "der", relative / 2);
	}
	
	if(nodoActual != null) 
	{
		let fact = 50;
		if(side == "raiz")
		{
			nodoActual.x = (altura * scale);
			relativeWidth = width;
		}
		else if(side == "izq")
		{
			nodoActual.x = relativeWidth - (relativeWidth / 2);
		}
		else
		{
			nodoActual.x = relativeWidth + (relativeWidth / 2);
		}
		nodoActual.y = (nivelActual * scale) + (scale / 2);
		nodoActual.radio = scale / 2;
		nodoActual.show();
		showArbol(nodoActual.getIzquierdo(), nivelActual + 1, "izq", relativeWidth / 2, relativeWidth);
		showArbol(nodoActual.getDerecho(), nivelActual + 1, "der", relativeWidth, relativeWidth);
	}
	
}
*/

function mouseClicked()
{
	if(mostrar % 3 == 0)
	{
		// arbol.rotarDerecha(arbol.getRaiz().getIzquierdo(), arbol.getRaiz());
		// arbol.rotarDerecha(arbol.getRaiz().getDerecho(), arbol.getRaiz());
		// arbol.rotarDerecha(arbol.getRaiz(), null);
		// arbol.rotarIzquierda(arbol.getRaiz(), null);
		// arbol.rotarIzquierda(arbol.getRaiz().getDerecho(), arbol.getRaiz());
		altura = arbol.calcularAltura(arbol.getRaiz(), 0, 0);
		if(altura <= 0) altura = 3;
		resizeCanvas(pow(2, altura - 2) * (tamañoNodo + (tamañoNodo / 2)) , altura * tamañoNodo)
		background(100);
		showArbol(arbol.getRaiz(), 0, width, null);
		drawLines(arbol.getRaiz());
		showArbol(arbol.getRaiz(), 0, width, null);
		mostrar++;
		// //console.log("mostrado", mostrar % 3);
		//arbol.imprimirArbol(arbol.getRaiz(), 0);
		//console.log("====================================");

		// //console.log("voy a equilibrar");
		if(arbol.equilibrar(arbol.getRaiz(), null, false))
		{
			arbol.equilibrar(arbol.getRaiz(), null, false);
		}
		// arbol.imprimirArbol(arbol.getRaiz(), 0);
		// //console.log("====================================");
	}
	else if(mostrar % 3 == 1)
	{
		altura = arbol.calcularAltura(arbol.getRaiz(), 0, 0);
		resizeCanvas(pow(2, altura - 2) * (tamañoNodo + (tamañoNodo / 2)) , altura * tamañoNodo);
		background(100);
		showArbol(arbol.getRaiz(), 0, width, null);
		drawLines(arbol.getRaiz());
		showArbol(arbol.getRaiz(), 0, width, null);
		// //console.log("equilibrado", mostrar % 3);
		mostrar++;
	}
	else
	{
		if(cont < valores.length)
		{
			arbol.agregar(valores[cont]);
			cont++;
		}
		else
		{
			// let num = floor(Math.random() * 100);
			// arbol.agregar(num);
			arbol.agregar(cont);
			cont++;
		}
		mostrar++;
		// //console.log("agregado: ", num);
	}
}

function draw() {

}