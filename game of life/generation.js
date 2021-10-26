class Generation
{
    constructor()
    {
        let posX = 0;
        let posY = 0;
        let position;
        let size;

        this.cells = new Array(filas);

        for(let i = 0; i < filas; i++)
        {

            this.cells[i] = new Array(columnas);
            for(let j = 0; j < columnas; j++)
            {
                position = {
                    x : posX,
                    y : posY,
                }

                size = {
                    w : ancho,
                    h : ancho,
                }
                this.cells[i][j] = new Cell(position, i, j, State.MUERTA, size);
                posX += ancho;
            }
            posX = 0;
            posY += ancho;
        }
    }

    show(generation)
    {
        let oldState = -1;
        for(let i = 0; i < filas; i++)
        {
            for(let j = 0; j < columnas; j++)
            {
                if(generation != undefined)
                {
                    oldState = generation.cells[i][j].state;
                }
                this.cells[i][j].show(oldState);
            }
        }
    }
}