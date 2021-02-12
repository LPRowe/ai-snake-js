class InputVals {
    constructor(){
        //Grid Properties
        this.borderWidth = 5;
        this.borderColor = 'blue';
        this.backgroundColor = 'black';

        this.lineWidth = 1;
        this.lineColor = 'rgb(255, 255, 255)';

        this.gridSize = 20;   
        this.tileCount = this.gridSize;

        this.gameOn = true; //denotes whether the snake is still alive and the game is running

        this.foodColor = 'red';

        //Snake Properties
        this.xStart = Math.floor(0.5*this.gridSize);
        this.yStart = Math.floor(0.5*this.gridSize);
        this.xLoc = this.xStart; //start position
        this.yLoc = this.yStart;

        this.xFood = 15; //food position
        this.yFood = 15;

        this.xVelStart = 0;
        this.yVelStart = 0;
        this.xVel = this.xVelStart; //snake velocity (starts in a stopped position)
        this.yVel = this.yVelStart; 

        this.trail = [{x:this.xLoc,y:this.yLoc}];
        this.tailNaught = 1;
        this.tail = this.tailNaught;
        
        //Add a life meter for how many steps can betaken without starving
        this.energyNaught = 150
        this.energy = this.energyNaught
        
        //keep track of score just before snake dies
        this.prevScore = 1
    }

}

vals = new InputVals()

function sleep(time){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function game(){
    
    //Decrease snake energy for every step taken
    if(vals.xVel != 0 || vals.yVel != 0){vals.energy -= 1}
    
    //Update snake location
    vals.xLoc += vals.xVel;
    vals.yLoc += vals.yVel;


    //Draw Background
    context.fillStyle = vals.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);


    //Add Grid horizontal and vertical lines
    context.beginPath(vals.gridSize, 0);
    context.lineWidth = String(vals.lineWidth);
    context.strokeStyle = vals.lineColor

    for (let col = 1 ; col < vals.tileCount ; col++){
        context.moveTo(vals.gridSize*col-vals.lineWidth, 0);
        context.lineTo(vals.gridSize*col-vals.lineWidth, canvas.width)
    }

    for (let row = 1 ; row < vals.tileCount ; row++){
        context.moveTo(0, vals.gridSize*row-vals.lineWidth);
        context.lineTo(canvas.height, vals.gridSize*row-vals.lineWidth)
    }
    context.stroke();


    //Add Border
    context.beginPath();
    context.lineWidth = String(vals.borderWidth);
    context.strokeStyle = '#0076ff';
    context.rect(0, 0, canvas.width, canvas.height);
    context.stroke();


    //Draw Snake And Handle Tail and Food Collisions
    context.fillStyle = 'lime';
    for(let i=0; i < vals.trail.length ; i++){
        context.fillRect(vals.trail[i].x*vals.gridSize, vals.trail[i].y*vals.gridSize, vals.gridSize - 2, vals.gridSize - 2)

        //If the snakes tail overlaps with its head it bit itself, decrease length
        if(vals.trail[i].x==vals.xLoc && vals.trail[i].y == vals.yLoc) {
            //tail = tailNaught;
            vals.gameOn = false;
        }
    }
    
    //Truncate snake down to new tail length which is 1 if the snake just died
    vals.trail.push({x:vals.xLoc, y:vals.yLoc});

    //Trim trail down to length of tail if trial is longer than tail
    while(vals.trail.length>vals.tail){
        vals.trail.shift();
    }

    //If the snake finds an food, increase the length
    if(vals.xFood == vals.xLoc && vals.yFood == vals.yLoc){
        vals.tail++;
        
        //One up previous score
        vals.prevScore++
        
        //Replenish energy
        vals.energy = vals.energyNaught

        //Respawn a new food
        vals.xFood = Math.floor(Math.random()*vals.tileCount);
        vals.yFood = Math.floor(Math.random()*vals.tileCount);

        //If food overlaps snake, choose different random location
        let count = 0;
        while (count < vals.trail.length){
            for (loc in vals.trail){
                if (vals.trail[loc].x == vals.xFood && vals.trail[loc].y == vals.yFood){                    
                    //Change Food Location
                    vals.xFood = Math.floor(Math.random()*vals.tileCount);
                    vals.yFood = Math.floor(Math.random()*vals.tileCount);
                    count = 0;
                }
                count++
            }
        }
    }


    //Draw Food
    context.fillStyle = vals.foodColor;
    context.fillRect(vals.xFood*vals.gridSize, vals.yFood*vals.gridSize, vals.gridSize - 2, vals.gridSize - 2);


    //Game over if snake goes out of bounds
    if (vals.xLoc < 0 || vals.xLoc >= vals.tileCount || vals.yLoc < 0 || vals.yLoc >= vals.tileCount){
        vals.gameOn = false;
    }
    
    //If the snake runs out of energy then game over
    if (vals.energy<=0){vals.gameOn = false;}

    //HANDLE COLLISIONS
    if (!vals.gameOn){
        //reset snake position and velocity
        vals.xLoc = vals.xStart;
        vals.yLoc = vals.yStart;

        vals.xVel = vals.xVelStart;
        vals.yVel = vals.yVelStart;

        vals.tail = vals.tailNaught;
        
        vals.energy = vals.energyNaught;
        vals.gameOn = true;
        
        if(!valsAI.sleeping){freezeGame.human = true;}
    }

}

    
function keyPush(event) {
    //Disable if game in freeze mode
    if(!freezeGame.human){
        //Left Down Right Up key codes
        switch(event.keyCode){
            case 37:
                if (vals.xVel!=1){
                    vals.xVel = -1;
                    vals.yVel = 0;
                    }
                if(!freezeGame.ai){valsAI.sleeping = false};
                break;
            case 38:
                if (vals.yVel!=1){
                    vals.xVel = 0;
                    vals.yVel = -1;
                    }
                if(!freezeGame.ai){valsAI.sleeping = false};
                break;
            case 39:
                if (vals.xVel!=-1){
                    vals.xVel = 1;
                    vals.yVel = 0;
                    }
                if(!freezeGame.ai){valsAI.sleeping = false};
                break;
            case 40:
                if (vals.yVel!=-1){
                    vals.xVel = 0;
                    vals.yVel = 1;
                    }
                if(!freezeGame.ai){valsAI.sleeping = false};
                break;
        }
    }
}
