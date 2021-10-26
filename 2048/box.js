class Box
{
    constructor(i, j, num)
    {
        this.i = i;
        this.j = j;
        this.num = num || 0;
        this.fill = 0;
        this.textSize = 64;
        this.combined = false;
        this.newValue = false;
        this.moving = false;
        this.dir = null;
        this.prwNum;
    }

    show()
    {
        if(this.num !== 0)
        {
            this.setFill();
            rectMode(CENTER);
            noStroke();
            fill(this.fill);
            rect((this.j * ancho) + (ancho / 2), (this.i * ancho) + (ancho / 2), ancho - 10, ancho - 10);
            strokeWeight(4);
            textSize(this.textSize);
            fill(255);
            stroke(255);
            textAlign(CENTER, CENTER)
            text(this.num, (this.j * ancho) + (ancho / 2), (this.i * ancho) + (ancho / 2));
        }
    }

    setFill(fill)
    {
        if(fill == null)
        {
            let logNum = Math.log2(this.num);
            // let green = map(logNum, 1, 11, 100, 200);
            // console.log("Green", green);
            // this.fill = color(255 - green, green, floor(green / 2));
            
            switch(logNum)
            {
                case 1:
                this.fill = color(108, 242, 137);
                this.textSize = 64;
                break;
                
                case 2:
                this.fill = color(50, 200, 50);
                this.textSize = 64;
                break;
                
                case 3:
                this.fill = color(130, 221, 209);
                this.textSize = 64;
                break;
                
                case 4:
                this.fill = color(125, 150, 200);
                this.textSize = 64;
                break;
                
                case 5:
                this.fill = color(0, 152, 151);
                this.textSize = 64;
                break;
                
                case 6:
                this.fill = color(206, 208, 125);
                this.textSize = 64;
                break;
                
                case 7:
                this.fill = color(249, 209, 113);
                this.textSize = 48;
                break;
                
                case 8:
                this.fill = color(255, 182, 90);
                this.textSize = 48;
                break;
                
                case 9:
                this.fill = color(255, 123, 90);
                this.textSize = 48;
                break;
                
                case 10:
                this.fill = color(255, 107, 107);
                this.textSize = 40;
                break;
                
                case 11:
                this.fill = color(255, 90, 90);
                this.textSize = 40;
                break; 
                
                default:
                this.fill = color(200);
                this.textSize = 32;
                
            }
            
        }
        else
        {
            this.fill = fill;
        }
    }

    respawn(resize)
    {
        this.setFill();
        rectMode(CENTER);
        noStroke();
        fill(this.fill);
        rect((this.j * ancho) + (ancho / 2), (this.i * ancho) + (ancho / 2), ancho - resize, ancho - resize);
    }

    move(dir, speed)
    {
        this.setFill();
        rectMode(CENTER);
        noStroke();
        fill(this.fill);
        if(dir.x != 0)
        {
            rect((this.j * ancho) + (ancho / 2) + (speed * dir.x), (this.i * ancho) + (ancho / 2), ancho - 10, ancho - 10);
        }
        else
        {
            rect((this.j * ancho) + (ancho / 2), (this.i * ancho) + (ancho / 2) + (speed * dir.y), ancho - 10, ancho - 10);
        }

        strokeWeight(4);
        textSize(this.textSize);
        fill(255);
        stroke(255);
        textAlign(CENTER, CENTER)
        
        if(dir.x != 0)
        {
            text(this.prwNum, (this.j * ancho) + (ancho / 2) + (speed * dir.x), (this.i * ancho) + (ancho / 2));
        }
        else
        {
            text(this.prwNum, (this.j * ancho) + (ancho / 2), (this.i * ancho) + (ancho / 2) + (speed * dir.y));
        }
    }
}