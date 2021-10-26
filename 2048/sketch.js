var grid;
var open = [];
var ancho;
var rows;
var cols;
var newValues = [];
var index = 0;
var resize;
var i, j, k;
var speed = 10;
var move = false;
var dir;
var movingBox = false;
var currentBox;
var valid = false;
var finishMotion = false;
var tempGrid;
var tempNum;
var boxToMove = [];
var finish = false;
var w;

function setup() {

    createCanvas(401, 401);
    background(0);
    ancho = 100;
	resize = ancho - 10;
	rows = 4;
	cols = 4;
	i = 0;
	j = 1;
	k = j;
	w = 0;

	// let a = [
	// 	[16,   4,   2,   0],
	// 	[8,   0,   0,   0],
	// 	[32,   0,   0,   0],
	// 	[0,   0,   0,   0]
	// ];
	// let a = [
	// 	[4096, 1024, 256, 1024, 512, 256, 128, 32, 8, 4],
	// 	[32, 8, 128, 64, 32, 4, 8, 8, 2, 0],
	// 	[4, 64, 32, 2, 0, 0, 0, 0, 0, 0],
	// 	[0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	// ];
	grid = new Array(rows);
	for(let i = 0; i < rows; i++)
    {
		grid[i] = new Array(cols);
        for(let j = 0; j < cols; j++)
        {
			// grid[i][j] = new Box(i, j, a[i][j]);
			grid[i][j] = new Box(i, j);
		}
	}


    addOpen();

    resetCombined();
    addValue();
    addValue();

}

function draw()
{
	drawGrid();
	motionRespawn();
	// if(finish)
	// {
	// 	motionBox2();
	// }
	if(move)
	{
		motionBox();
	}
	if(finishMotion)
	{
		if(!compareGrid(tempGrid, grid))
		{
			printGrid();
			addValue();
		}
		resetCombined();
		finishMotion = false;
		tempGrid = null;
	}
}

function motionBox2()
{

	if(w < boxToMove.length)
	{
		for(let z = 0; z < boxToMove[w].length; z++)
		{
			let boxMove = boxToMove[w][z];
			if(speed < ancho)
			{
				// console.log(boxMove.box);
				boxMove.box.move(boxMove.dir, speed);
				speed += 1;
			}
			else
			{
				speed = 1;
				w++;
			}
		}
	}
	else
	{
		for(let i = 0; i < rows; i++)
		{
			for(let j = 0; j < cols; j++)
			{
				grid[i][j].moving = false;
			}
		}
		finish = false;
		w = 0;
		boxToMove.length = 0;
	}

}

function drawGrid()
{
	for(let i = 0; i < rows; i++)
	{
		for(let j = 0; j < cols; j++)
		{
			rectMode(CENTER)
			fill(255);
			stroke(140);
			strokeWeight(15);
			fill(180);
			if(!grid[i][j].newValue)
			{
			}
			rect((j * ancho) + (ancho / 2), (i * ancho) + (ancho / 2), ancho, ancho);
			if(grid[i][j].num !== 0 && !grid[i][j].newValue && !grid[i][j].moving)
			{
				grid[i][j].show();
			}
		}
	}
}

function motionBox()
{
	if(!movingBox)
	{
		if(dir != null)
		{
			if(tempGrid == null)
			{
				tempGrid = cloneGrid(grid);
			}
			while(i < rows && currentBox == null)
			{
				while(j < cols && currentBox == null)
				{
					while(k > 0 && currentBox == null)
					{
						valid = false;
						let temp;
						let pareja;
						let data;
						if(dir.x == -1)
						{
							temp = grid[i][k].num;
							pareja = grid[i][k - 1].num;
							data = {
								cI : i,
								cJ : k,
								pI : i,
								pJ : k - 1,
							};
						}
						else if(dir.x == 1)
						{
							temp = grid[i][cols - k - 1].num;
							pareja = grid[i][cols - k].num;
							data = {
								cI : i,
								cJ : cols - k - 1,
								pI : i,
								pJ : cols - k,
							};
						}
						else if(dir.y == -1)
						{
							temp = grid[k][i].num;
							pareja = grid[k - 1][i].num;
							data = {
								cI : k,
								cJ : i,
								pI : k - 1,
								pJ : i,
							};
						}
						else if(dir.y == 1)
						{
							temp = grid[cols - k - 1][i].num;
							pareja = grid[cols - k][i].num;
							data = {
								cI : cols - k - 1,
								cJ : i,
								pI : cols - k,
								pJ : i,
							};
						}
						tempNum = temp;

						if(temp != 0)
						{
							if(grid[data.pI][data.pJ].combined && pareja == 0)
							{
								valid = true;
								pareja += temp;
								temp = 0;
							}
							if(!grid[data.pI][data.pJ].combined && !grid[data.cI][data.cJ].combined)
							{
								if(pareja == temp)
								{
									valid = true;
									pareja += temp;
									temp = 0;
									grid[data.pI][data.pJ].combined = true;
								}
								else if(pareja == 0)
								{
									valid = true;
									pareja += temp;
									temp = 0;
								}
							}
							grid[data.cI][data.cJ].num = temp;
							grid[data.pI][data.pJ].num = pareja;
							currentBox = grid[data.cI][data.cJ];
							if(!valid)
							{
								currentBox = null;
							}
							else
							{
								currentBox.moving = true;
								currentBox.num = tempNum;
							}
						}
						if(currentBox == null)
						{
							k--;
						}
					}

					if(currentBox == null)
					{
						j++;
						k = j;
					}
				}
				if(currentBox == null)
				{
					i++;
					j = 1;
					k = j;
				}
			}
			if(currentBox == null)
			{
				dir = null;
				move = false;
				finishMotion = true;
			}
		}
		movingBox = true;
	}
	else
	{
		if(currentBox != null)
		{
			if(speed < ancho)
			{
				currentBox.move(dir	, speed);
				speed += 50;
			}
			else
			{
				speed = 30;
				movingBox = false;
				currentBox.moving = false;
				currentBox.num = 0;
				currentBox = null;
				if(k > 0)
				{
					k--;
				}
				else if(j < cols)
				{
					j++;
					k = j;
				}
				else if(i < rows)
				{
					i++;
					j = 1;
					k = j;
				}
				else
				{
					dir = null;
					move = false;
					finishMotion = true;
				}
			}
		}
		else
		{
			if(k > 0)
			{
				k--;
			}
			else if(j < cols)
			{
				j++;
				k = j;
			}
			else if(i < rows)
			{
				i++;
				j = 1;
				k = j;
			}
			else
			{
				dir = null;
				move = false;
			}
			movingBox = false;
		}
	}
}

function motionRespawn()
{
	addNewValues();
	if(newValues.length > 0 && index < newValues.length)
	{
		if(resize > 10)
		{
			grid[newValues[index].i][newValues[index].j].respawn(resize);
			resize -= 20;
		}
		else
		{
			resize = ancho - 10;
			grid[newValues[index].i][newValues[index].j].newValue = false;
			index++;
		}

	}
	else
	{
		newValues.length = 0;
		index = 0;
	}
}
function mouseClicked()
{
    // addValue();
}


function resetCombined()
{
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < cols; j++)
        {
            grid[i][j].combined = false;
        }
    }
}

function addNewValues()
{
	newValues.length = 0;
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < cols; j++)
        {
            if(grid[i][j].newValue == true)
            {
                newValues.push({i, j});
            }
        }
    }
}

function addOpen()
{
	open.length = 0;
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < cols; j++)
        {
            if(grid[i][j].num == 0)
            {
                open.push({i, j});
            }
        }
    }
}

function addValue()
{
	addOpen();
    if(open.length > 0)
    {
		let ranI = floor(random(0, open.length));
        let openOne = {
            i : open[ranI].i,
            j : open[ranI].j,
        };

		grid[openOne.i][openOne.j].num = random(0, 1) < 0.1 ? 4 : 2;
		grid[openOne.i][openOne.j].newValue = true;
    }
}

function keyPressed()
{
	if(!move)
	{
		movingBox = false;
		i = 0;
		j = 1;
		k = j;
		move = true;
		switch(keyCode)
		{
			case LEFT_ARROW:
				dir = {
					x : -1,
					y : 0,
				}
				// slice();
				break;

			case RIGHT_ARROW:
				dir = {
					x : 1,
					y : 0,
				}
				// slice();
				break;

			case UP_ARROW:
				dir = {
					x : 0,
					y : -1,
				}
				// slice();
				break;

			case DOWN_ARROW:
				dir = {
					x : 0,
					y : 1,
				}
				// slice();
				break;

		}
	}

	// movingBox = false;
	// i = 0;
	// j = 1;
	// k = j;
	// move = true;
	// switch(keyCode)
	// {
	// 	case LEFT_ARROW:
	// 		dir = {
	// 			x : -1,
	// 			y : 0,
	// 		}
	// 		slice();
	// 		break;

	// 	case RIGHT_ARROW:
	// 		dir = {
	// 			x : 1,
	// 			y : 0,
	// 		}
	// 		slice();
	// 		break;

	// 	case UP_ARROW:
	// 		dir = {
	// 			x : 0,
	// 			y : -1,
	// 		}
	// 		slice();
	// 		break;

	// 	case DOWN_ARROW:
	// 		dir = {
	// 			x : 0,
	// 			y : 1,
	// 		}
	// 		slice();
	// 		break;

	// }
}

function slice()
{
	let tempGrid = cloneGrid(grid);
	for(let i = 0; i < rows; i++)
	{
		boxToMove[i] = [];
		for(let j = 1; j < cols; j++)
		{
			for(let k = j; k > 0; k--)
			{
				let box;
				let current;
				let pareja;
				let data;
				if(dir.x == -1)
				{
					current = grid[i][k].num;
					pareja = grid[i][k - 1].num;
					box = grid[i][k];
					data = {
						cI : i,
						cJ : k,
						pI : i,
						pJ : k - 1,
					};
				}
				else if(dir.x == 1)
				{
					current = grid[i][cols - k - 1].num;
					pareja = grid[i][cols - k].num;
					box = grid[i][cols - k - 1];
					data = {
						cI : i,
						cJ : cols - k - 1,
						pI : i,
						pJ : cols - k,
					};
				}
				else if(dir.y == -1)
				{
					current = grid[k][i].num;
					pareja = grid[k - 1][i].num;
					box = grid[k][i];
					data = {
						cI : k,
						cJ : i,
						pI : k - 1,
						pJ : i,
					};
				}
				else if(dir.y == 1)
				{
					current = grid[cols - k - 1][i].num;
					pareja = grid[cols - k][i].num;
					box = grid[cols - k - 1][i];
					data = {
						cI : cols - k - 1,
						cJ : i,
						pI : cols - k,
						pJ : i,
					};
				}

				if(current != 0)
				{
					if(grid[data.pI][data.pJ].combined && pareja == 0)
					{
						boxToMove[i].unshift({box, dir});
						box.moving = true;
						box.prwNew = current;
						pareja += current;
						current = 0;
					}
					if(!grid[data.pI][data.pJ].combined && !grid[data.cI][data.cJ].combined)
					{
						if(pareja == current)
						{
							boxToMove[i].unshift({box, dir});
							box.prwNew = current;
							box.moving = true;
							pareja += current;
							current = 0;
							grid[data.pI][data.pJ].combined = true;
						}
						else if(pareja == 0)
						{
							boxToMove[i].unshift({box, dir});
							box.moving = true;
							box.prwNew = current;
							pareja += current;
							current = 0;
						}
					}
					grid[data.cI][data.cJ].num = current;
					grid[data.pI][data.pJ].num = pareja;
				}
			}
		}
	}
	if(!compareGrid(tempGrid, grid))
	{
		printGrid();
		addValue();
	}
	finish = true;
	resetCombined();
}

function compareGrid(old, nw)
{
	let equals = true;
    for(let i = 0; i < old.length && equals; i++)
    {
        for(let j = 0; j < old[0].length && equals; j++)
        {
			if(old[i][j].num != nw[i][j].num)
			{
				equals = false;
			}
        }
	}
	return equals;
}

function cloneGrid(org)
{
    let clone = new Array(org.length);

    for(let i = 0; i < org.length; i++)
    {
        clone[i] = new Array(org[0].length);
        for(let j = 0; j < org[0].length; j++)
        {
            clone[i][j] = new Box(i, j, org[i][j].num);
        }
    }

    return clone;
}

function printGrid()
{
	str = "";
	for(let i = 0; i < grid.length; i++)
	{
		for(let j = 0; j < grid[0].length; j++)
		{
			str += grid[i][j].num + "	";
		}
		str += "\n";
	}

	console.log(str);
}