class ArbolAVL
{
    constructor() 
	{
        this.raiz = null;
        this.__peso = 0;
	}
	
	/**
	 * Verifica si un árbol está vacío
	 * @return true si está vacío
	 */
	estaVacio() {
		return this.raiz == null;
	}

	
	/**
	 * Agrega un nuevo elemento al árbol
	 * @param elemento Nuevo dato
	 * @return true si lo pudo guardar
	 */
	agregar(elemento) 
	{
		//console.log("\n", "\n");
		//console.log("agregemos el", elemento);
		if(this.estaVacio()) 
		{
			this.raiz = new Nodo(elemento);
			this.__peso++;
		}
		else if(this.raiz.agregar(elemento))
		{
			this.__peso++;
			this.definirFactorEquilibrio(arbol.getRaiz());
			// this.equilibrar(this.raiz, null);
		}		
	}
	
	
	
	preorden(nodo) 
	{
		if(nodo == null) 
		{
			return;
		}
		else 
		{
			//console.log(nodo.getElemento());
			this.preorden(nodo.getIzquierdo());
			this.preorden(nodo.getDerecho());
		}
	}
	
	obtenerMenorRec(nodo) 
	{
		if(this.raiz != null) 
		{
			if(nodo.getIzquierdo() == null) 
			{
				return nodo.getElemento();
			}
			else 
			{
				return this.obtenerMenorRec(nodo.getIzquierdo());
			}			
		}
		return null;
	}
	
	obtenerMenorIte(nodo) 
	{
		if(this.raiz != null) 
		{
			while(nodo.getIzquierdo() != null) 
			{
				nodo = nodo.getIzquierdo();
			}
			return nodo.getElemento();			
		}
		return null;
	}
	
	isEqualto(arbol, nodo1, nodo2, identicos) 
	{
		if(this.raiz != null && arbol.raiz != null) 
		{
			if(nodo1 == null || nodo2 == null) 
			{
				if((nodo1 == null && nodo2 != null) || (nodo1 != null && nodo2 == null)) 
				{
					return false;
				}
				return identicos;
			}
			else if(!identicos) 
			{
				return false;
			}
			else 
			{
				////console.log("1: " + nodo1.getElemento());
				////console.log("2: " + nodo2.getElemento());
				////console.log("3: " + (nodo1.getElemento() == nodo2.getElemento()));
				if(nodo1.getElemento() == nodo2.getElemento()) 
				{
					////console.log("asd1");
					identicos = this.isEqualto(arbol, nodo1.getIzquierdo(), nodo2.getIzquierdo(), identicos) &&
							this.isEqualto(arbol, nodo1.getDerecho(), nodo2.getDerecho(), identicos);					
					return identicos;
				}
				else 
				{
					////console.log("asd2");
					return false;
				}
			}
			
		}
		return false;
	}

	equilibrar(nodoActual, nodoPadre, rotado)
	{
		if(this.raiz != null)
		{
			if(nodoActual != null)
			{
				if(!rotado)
				{
					// //console.log("evaluemos el nodo:", nodoActual.getElemento());
					// //console.log("miremos la derecha del ", nodoActual.getElemento());
					this.equilibrar(nodoActual.getIzquierdo(), nodoActual);
					// //console.log("miremos la izquierda del ", nodoActual.getElemento());
					this.equilibrar(nodoActual.getDerecho(), nodoActual);
					// //console.log("miremos el factor de equilibrio del ", nodoActual.getElemento());
					// //console.log("izquierda:", nodoActual.alturaIzq, "derecha:", nodoActual.alturaDer);
					// //console.log("factor de equilibrio:", nodoActual.factorEquilibrio);
					if(Math.abs(nodoActual.factorEquilibrio) > 1)
					{
						// //console.log("esta desequilibrado");
						if(nodoActual.factorEquilibrio < 0)
						{
							// //console.log("rotaremos a la derecha");
							if(nodoActual.getIzquierdo().factorEquilibrio > 0)
							{
								// //console.log("rotacion simple");
								this.rotarDobleDerecha(nodoActual, nodoPadre);
							}
							else
							{
								// //console.log("rotacion doble");
								this.rotarDerecha(nodoActual, nodoPadre);
							}
						}
						else
						{
							// //console.log("rotaremos a la izquierda");
							if(nodoActual.getDerecho().factorEquilibrio < 0)
							{
								// //console.log("rotacion simple");
								this.rotarDobleIzquierda(nodoActual, nodoPadre);
							}
							else
							{
								// //console.log("rotacion doble");
								this.rotarIzquierda(nodoActual, nodoPadre);
							}
						}
						// //console.log("definamos el factor de equilibrio por la nueva rotacion");
						this.definirFactorEquilibrio(this.raiz);
						return true;
					}
					else
					{
						// //console.log("esta equilibrado");
						return rotado;
					}
				}
				return false;
			}
			return rotado;
		}
		return false;
	}

	definirFactorEquilibrio(nodoActual)
	{
		if(this.raiz != null)
		{
			if(nodoActual != null)
			{
				this.definirFactorEquilibrio(nodoActual.getIzquierdo());
				this.definirFactorEquilibrio(nodoActual.getDerecho());
				if(nodoActual.getIzquierdo() != null)
				{
					nodoActual.alturaIzq = this.calcularAltura(nodoActual.getIzquierdo(), 0, 0);
				}
				else
				{
					nodoActual.alturaIzq = 0;
				}
				
				if(nodoActual.getDerecho() != null)
				{
					nodoActual.alturaDer = this.calcularAltura(nodoActual.getDerecho(), 0, 0);
				}
				else
				{
					nodoActual.alturaDer = 0;
				}
				nodoActual.factorEquilibrio = nodoActual.alturaDer - nodoActual.alturaIzq;
				// //console.log("nodoActual:", nodoActual.getElemento(), "izquierda:", nodoActual.alturaIzq, "derecha:", nodoActual.alturaDer, "factor:", nodoActual.factorEquilibrio);
			}
		}
	}

	rotarDobleDerecha(nodoActual, nodoPadre)
	{
		this.rotarIzquierda(nodoActual.getIzquierdo(), nodoActual);
		this.rotarDerecha(nodoActual, nodoPadre);
	}

	rotarDobleIzquierda(nodoActual, nodoPadre)
	{
		this.rotarDerecha(nodoActual.getDerecho(), nodoActual);
		this.rotarIzquierda(nodoActual, nodoPadre);
	}

	rotarDerecha(nodoActual, nodoPadre)
	{
		let nodoTemp;
		let nodoAux = nodoActual;
		if(nodoActual.getIzquierdo().getDerecho() != null)
		{
			nodoTemp = nodoActual.getIzquierdo().getDerecho();
		}
		if(nodoPadre == null)
		{
			this.raiz = nodoActual.getIzquierdo();
		}
		else if(nodoPadre.getIzquierdo() === nodoActual)
		{
			nodoPadre.setIzquierdo(nodoActual.getIzquierdo()); 	
		}
		else
		{
			nodoPadre.setDerecho(nodoActual.getIzquierdo());
		}
		nodoActual = nodoActual.getIzquierdo();
		nodoActual.setPadre(nodoPadre);
		nodoAux.setIzquierdo(null);
		nodoActual.setDerecho(nodoAux);
		nodoActual.getDerecho().setPadre(nodoActual);
		if(nodoTemp != null)
		{
			nodoActual.getDerecho().setIzquierdo(nodoTemp);
			nodoTemp.setPadre(nodoActual.getDerecho());
		}
	}

	rotarIzquierda(nodoActual, nodoPadre)
	{
		let nodoTemp;
		let nodoAux = nodoActual;
		if(nodoActual.getDerecho().getIzquierdo() != null)
		{
			nodoTemp = nodoActual.getDerecho().getIzquierdo();
		}
		if(nodoPadre == null)
		{
			this.raiz = nodoActual.getDerecho();
		}
		else if(nodoPadre.getDerecho() === nodoActual)
		{
			nodoPadre.setDerecho(nodoActual.getDerecho()); 	
		}
		else
		{
			nodoPadre.setIzquierdo(nodoActual.getDerecho());
		}
		nodoActual = nodoActual.getDerecho();
		nodoActual.setPadre(nodoPadre);
		nodoAux.setDerecho(null);
		nodoActual.setIzquierdo(nodoAux);
		nodoActual.getIzquierdo().setPadre(nodoActual);
		if(nodoTemp != null)
		{
			nodoActual.getIzquierdo().setDerecho(nodoTemp);
			nodoTemp.setPadre(nodoActual.getIzquierdo());
		}
	}

	eliminar(nodoActual, nodoPadre, eliminado, nodoAux, valor) 
	{
		if(nodoActual == null)
		{
			////console.log("El nodo es nullo");
			return;
		}
		else 
		{
			if(nodoPadre != null) 
			{
				////console.log("nodoPadre: " + nodoPadre.getElemento());
			}
			////console.log("nodoActual: " + nodoActual.getElemento());				
			if(!eliminado) 
			{
				////console.log("Eliminado es falso");
				if((int)(nodoActual.getElemento()) == (int)(valor)) 
				{					
					////console.log("El nodo es igual al valor");
					if(nodoActual.esHoja())
					{
						////console.log("El nodo es hoja");
						////console.log("Eliminelo");
						////console.log(nodoActual.getElemento()); 
						if(nodoPadre.getDerecho() == nodoActual) 
						{
							nodoPadre.setDerecho(null);
						}
						else 
						{
							nodoPadre.setIzquierdo(null);
						}
					}
					else if(nodoActual.tieneUnHijo())
					{
						////console.log("El nodo tiene un hijo");
						if(nodoActual.getDerecho() != null) 
						{
							////console.log("Eliminemos el nodo con hijo derecho");
							if(nodoPadre.getIzquierdo() == nodoActual) 
							{
								nodoPadre.setIzquierdo(nodoActual.getDerecho());
								nodoPadre.getIzquierdo().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
							else 
							{
								nodoPadre.setDerecho(nodoActual.getDerecho());
								nodoPadre.getDerecho().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
						}
						else 
						{
							////console.log("Eliminemos el nodo con hijo izquierdo");
							if(nodoPadre.getIzquierdo() == nodoActual) 
							{
								nodoPadre.setIzquierdo(nodoActual.getIzquierdo());
								nodoPadre.getIzquierdo().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
							else 
							{
								nodoPadre.setDerecho(nodoActual.getIzquierdo());
								nodoPadre.getDerecho().setPadre(nodoPadre);
								nodoActual.getDerecho().setPadre(nodoPadre);
							}
							this.eliminar(nodoActual, nodoPadre, true, nodoAux, valor);
						}
					}
					else 
					{
						nodoAux = nodoActual.getDerecho();
						////console.log("nodoAux: " + nodoAux.getElemento());
						////console.log("El nodo tiene dos hijos");
						if(nodoPadre.getDerecho() == nodoActual) 
						{
							nodoPadre.setDerecho(nodoActual.getIzquierdo());
							nodoPadre.getDerecho().setPadre(nodoPadre);
							nodoActual.getDerecho().setPadre(nodoPadre);
						}
						else 
						{
							nodoPadre.setIzquierdo(nodoActual.getIzquierdo());
							nodoPadre.getIzquierdo().setPadre(nodoPadre);
							nodoActual.getDerecho().setPadre(nodoPadre);
						}

						////console.log("existe padre: ", nodoPadre.getElemento(), nodoActual.getElemento(), nodoActual.getPadre().getElemento());
						if(nodoPadre.getIzquierdo() != null)////console.log("izq Padre: " + nodoPadre.getIzquierdo().getElemento());
						if(nodoPadre.getDerecho() != null)////console.log("der Padre: " + nodoPadre.getDerecho().getElemento());
						this.eliminar(nodoActual.getIzquierdo(), nodoPadre, true, nodoAux, valor);
					}				
				}
				else if((int)(nodoActual.getElemento()) < (int)(valor)) 
				{
					////console.log("El valor es mayor");
					this.eliminar(nodoActual.getDerecho(), nodoActual,false, nodoAux, valor);
				}
				else 
				{
					////console.log("El valor es menor");
					this.eliminar(nodoActual.getIzquierdo(), nodoActual,false, nodoAux, valor);
				}
			}
			else 
			{
				////console.log("ok");
				
				if(nodoActual.getDerecho() == null) 
				{
					////console.log("Le añado el aux");
					nodoActual.setDerecho(nodoAux);
					nodoActual.getDerecho().setPadre(nodoActual);
					////console.log("nodoAux: ", nodoAux.getElemento());

					nodoAux.setPadre(nodoActual);
				}
				else 
				{
					this.eliminar(nodoActual.getDerecho(), nodoActual, true, nodoAux, valor);
				}
			}				
		}		
	}
	
	hallarNivelNodo() 
	{
		
	}
	
	imprimirArbol(nodo, nivel) 
	{
		if(nodo != null) 
		{
			this.imprimirArbol(nodo.getDerecho(), nivel + 1);
			let msj = "";
			for(let i = 0; i < nivel; i++) 
			{
				msj += "\t";
			}
			console.log(msj + "- " + nodo.getElemento());
			this.imprimirArbol(nodo.getIzquierdo(), nivel + 1);
		}
    }
    
    calcularAltura(nodoActual, max, localMax) 
    {
        if (nodoActual == null) 
        {
            if (localMax > max) 
            {
				max = localMax;
			}
			return max;
        }
        else 
        {
            let n1 = this.calcularAltura(nodoActual.getIzquierdo(), max, localMax + 1);
			let n2 = this.calcularAltura(nodoActual.getDerecho(), max, localMax + 1);
            if (n1 > n2) 
            {
				return n1;
            }
            else 
            {
				return n2;
			}
		}
	}
	
	contarHojas(nodo, cont)  
	{
		if(this.raiz != null) 
		{
			if(nodo == null) 
			{
				return 0;
			}
			else if(nodo.esHoja()) 
			{
				return 1;
			}
			else 
			{
				cont = this.contarHojas(nodo.getDerecho(), cont) + this.contarHojas(nodo.getIzquierdo(), cont);
				return cont;
			}			
		}
		return -1;
	}

	/**
	 * @return the this.raiz
	 */
	getRaiz() {
		return this.raiz;
	}
	/**
	 * @param this.raiz the this.raiz to set
	 */
	setRaiz() {
		this.raiz = this.raiz;
	}
	/**
	 * @return the peso
	 */
	getPeso() {
		return this.__peso;
	}
}