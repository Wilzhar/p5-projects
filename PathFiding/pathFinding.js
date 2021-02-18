class PathFinding {
    constructor() {
        start.state = StateBox.OPEN;
        this.openList = [start];
        this.closeList = [];
        this.lowCost;
        this.openBox(start);
        start.fCost = start.hCost;
    }

    search() {
        if (!founded) {
            // this.drawLine();
            if (this.openList.length > 0) {
                let minCostPos;
                let minimosCostos = this.searchMinFCost();
                console.log("HI", minimosCostos.length);
                if(minimosCostos.length > 1)
                {
                    console.log("T", minimosCostos);
                    minCostPos = searchMinHCost(minimosCostos);
                    console.log("m", minimosCostos[minCostPos]);
                }
                else
                {
                    minCostPos = minimosCostos[0];
                }
                if (minCostPos >= 0) {
                    this.lowCost = this.openList[minCostPos].fCost;
                    this.openBox(this.openList[minCostPos]);
                }
            } else {
                founded = true;
                runningSearch = false;
            }
            this.definirNucleusBoxes();
        } else {
            
            // this.drawLine();
            this.drawPath(end);
        }
    }

    openBox(box) {
        //this.quicksort(0, this.openList.length - 1);
        // for(let i = 0; i < this.openList.length; i++)
        // {
        //     console.log("pos:", i + 1, "GCost:", this.openList[i].gCost, "HCost:", this.openList[i].hCost, "FCost:", this.openList[i].fCost);
        // }
        box.definirCostoG();
        let boxI = box.i;
        let boxJ = box.j;
        box.state = StateBox.CLOSE;
        let posArreglo = this.obtenerPosicionArreglo(box);
        if (posArreglo != -1) {
            this.openList.splice(posArreglo, 1);
        }
        this.closeList.push(box);
        box.show();
        for (let addH = -1; addH <= 1; addH++) {
            for (let addV = -1; addV <= 1; addV++) {
                if (addH != 0 || addV != 0) {
                    if (boxI + addV >= 0 && boxI + addV < boxes.length) {
                        if (boxJ + addH >= 0 && boxJ + addH < boxes[0].length) {
                            let currentBox = boxes[boxI + addV][boxJ + addH];


                            if (!this.isCornerNeighbor(box, currentBox) ||
                                (this.isCornerNeighbor(box, currentBox) && this.isValidCornerNeighbor(box, currentBox))) {
                                if (currentBox == end) {
                                    founded = true;
                                    runningSearch = false;
                                    currentBox.fCost = 0;
                                    this.closeList.push(currentBox);
                                    currentBox.nucleusBox = box;
                                } else {
                                    if (currentBox.state == StateBox.NEUTRO && currentBox.type == TypeBox.PATH) {
                                        currentBox.state = StateBox.OPEN;
                                        if (currentBox.nucleusBox != null) {
                                            if (currentBox.nucleusBox.gCost > box.gCost) {
                                                currentBox.nucleusBox = box;
                                            }
                                        } else {
                                            currentBox.nucleusBox = box;
                                        }
                                        currentBox.definirCostoG();
                                        currentBox.definirCostoF();                                        
                                        this.openList.push(currentBox);
                                        currentBox.show();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    isCornerNeighbor(box, neighbor) {
        let corner = false;
        let posIN = neighbor.i;
        let posJN = neighbor.j;
        let posI = box.i;
        let posJ = box.j;

        if (posIN + 1 == posI && posJN + 1 == posJ) {
            corner = true;
        } else if (posIN - 1 == posI && posJN - 1 == posJ) {
            corner = true;
        } else if (posIN - 1 == posI && posJN + 1 == posJ) {
            corner = true;
        } else if (posIN + 1 == posI && posJN - 1 == posJ) {
            corner = true;
        }

        return corner;
    }

    isValidCornerNeighbor(box, neighbor) {
        let valido = true;
        let posIN = neighbor.i;
        let posJN = neighbor.j;
        let posI = box.i;
        let posJ = box.j;

        if (posIN + 1 == posI && posJN + 1 == posJ) {
            if (boxes[posIN + 1][posJN].type == TypeBox.WALL && boxes[posIN][posJN + 1].type == TypeBox.WALL) {
                valido = false;
            }
        } else if (posIN - 1 == posI && posJN - 1 == posJ) {
            if (boxes[posIN - 1][posJN].type == TypeBox.WALL && boxes[posIN][posJN - 1].type == TypeBox.WALL) {
                valido = false;
            }
        } else if (posIN + 1 == posI && posJN - 1 == posJ) {
            if (boxes[posIN + 1][posJN].type == TypeBox.WALL && boxes[posIN][posJN - 1].type == TypeBox.WALL) {
                valido = false;
            }
        } else if (posIN - 1 == posI && posJN + 1 == posJ) {
            if (boxes[posIN - 1][posJN].type == TypeBox.WALL && boxes[posIN][posJN + 1].type == TypeBox.WALL) {
                valido = false;
            }
        }

        return valido;
    }

    definirNucleusBoxes() {
        for (let i = 0; i < this.openList.length; i++) {
            let currentBox = this.openList[i];
            let boxI = currentBox.i;
            let boxJ = currentBox.j;

            for (let addH = -1; addH <= 1; addH++) {
                for (let addV = -1; addV <= 1; addV++) {
                    if (addH != 0 || addV != 0) {
                        if (boxI + addV >= 0 && boxI + addV < boxes.length) {
                            if (boxJ + addH >= 0 && boxJ + addH < boxes[0].length) {
                                let neighborBox = boxes[boxI + addV][boxJ + addH];
                                if (neighborBox.nucleusBox != null) {
                                    if (currentBox.nucleusBox.gCost > neighborBox.gCost) {
                                        currentBox.nucleusBox = neighborBox;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    obtenerPosicionArreglo(box) {
        for (let i = 0; i < this.openList.length; i++) {
            if (this.openList[i].i == box.i && this.openList[i].j == box.j) {
                return i;
            }
        }
        return -1;
    }

    drawPath(box) {

        if (box.nucleusBox != null) {
            stroke("White");
            line(box.position.x + (anchoBox / 2), box.position.y + (altoBox / 2),
                box.nucleusBox.position.x + (anchoBox / 2), box.nucleusBox.position.y + (altoBox / 2))
            this.drawPath(box.nucleusBox);
        }
    }

    drawLine() {
        let fxn = function (currentBox) {
            if (currentBox.nucleusBox != null) {
                stroke("Black");
                line(currentBox.position.x + (anchoBox / 2), currentBox.position.y + (altoBox / 2),
                    currentBox.nucleusBox.position.x + (anchoBox / 2), currentBox.nucleusBox.position.y + (altoBox / 2));
            }
        }

        loopEach(fxn);
    }

    searchMinFCost() {
        let posMin = 0;
        if (this.openList.length > 0) {
            for (let i = 0; i < this.openList.length; i++) {
                if (this.openList[i].fCost < this.openList[posMin].fCost) {
                    posMin = i;
                }
            }
        }
        let minimosCostos = [posMin];
        for(let i = 0; i < this.openList; i++)
        {
            if(i != posMin)
            {
                if(this.openList[posMin].fCost == this.openList[i])
                {
                    minimosCostos.push(this.openList[i]);
                }
            }
        }
        return minimosCostos;
    }

    searchMinHCost(minimosCostos) 
    {
        let posMin = 0;
        if (minimosCostos.length > 0) {
            for (let i = 0; i < minimosCostos.length; i++) {
                if (minimosCostos[i].hCost < minimosCostos[posMin].hCost) {
                    posMin = i;
                }
            }
        }

        return posMin;
    }

    loopOpen(fxn) {
        for (let i = 0; i < this.openList.length; i++) {
            fxn(this.openList[i]);
        }
    }
}