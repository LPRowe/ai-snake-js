class InputValsAI {
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
        
        //If basic instinct, the snake will filter out options that immediately lead to death
        this.basicInstinct = true;
        
        //Make snake wait for the human player to start before it begins moving
        this.humanFirst = true;
        this.sleeping = true;
        
        //Energy bar
        this.energyNaught = 150;
        this.energy = this.energyNaught;
        
        //Store previous score to show on scoreboard incase ai dies first
        this.prevScore = 1
        
        
        //Neural net weights
        this.c = [[[ 1.,  1.,  0.,  0.,  0.,  0.,  0., -1., -1.,  0.,  2.,  0., -1., 0.],
             [-1.,  1.,  2., -1.,  0.,  0., -1.,  0.,  2.,  0.,  1.,  2.,  2.,  0.],
             [ 4.,  0.,  0., -3.,  2.,  4., -6.,  0.,  0.,  0.,  3.,  0.,  0., -2.],
             [-1.,  0.,  0.,  5., -1.,  0.,  0., -3., -3., -1.,  0.,  0.,  0., -1.],
             [-2., -1.,  1.,  0.,  1.,  0., -2., -1.,  0., -2.,  0.,  0.,  0.,  1.],
             [ 0.,  2., -2.,  0.,  1.,  0.,  0.,  0., -1., -1.,  0.,  1.,  0.,  0.],
             [ 2.,  1.,  0., -4.,  0.,  0.,  0., -1.,  0., -1.,  0.,  1.,  0., -4.],
             [-1.,  0., -1.,  0.,  0., -2., -1., -1.,  0.,  3., -3.,  0.,  0.,  0.],
             [ 0.,  0., -2.,  0.,  0., -1.,  1.,  0.,  0., -1.,  0.,  0.,  0., -2.],
             [ 0., -1.,  0.,  0.,  0., -1., -1.,  0.,  1.,  1., -1.,  0.,  0., -1.],
             [ 0.,  0.,  0.,  0., -1.,  0., -1.,  1.,  0.,  0., -3.,  0.,  0., -1.],
             [-1.,  0.,  0.,  0.,  1.,  0.,  1., -1.,  0.,  0.,  0.,  0.,  1.,  0.],
             [ 1.,  1., -1.,  0.,  2., -3.,  0.,  0.,  0.,  0., -1.,  0.,  1.,  0.],
             [ 1.,  0.,  1., -1.,  0., -1.,  0., -1.,  1.,  0.,  0., -1., -1.,  0.],
             [ 1.,  1.,  0.,  0.,  0.,  0.,  1.,  0.,  0.,  0.,  1.,  0., -2.,  0.],
             [-1., -2., -1.,  1.,  0.,  0.,  0.,  1.,  1.,  0.,  0., -1.,  0.,  0.],
             [ 3., -3.,  0.,  0.,  1., -2.,  0.,  0.,  1.,  2.,  0., -1.,  0., -1.],
             [ 1.,  3., -3., -1.,  2.,  1.,  0.,  0.,  1., -1.,  0., -1.,  0., -1.]],
            [[ 0., -1., -4.,  0., -2.,  1.,  1.,  0.],
             [ 1.,  0., -1., -1.,  0.,  2., -1.,  0.],
             [-1.,  1.,  0., -1.,  0.,  0.,  0.,  0.],
             [-2.,  2.,  0.,  0.,  1.,  0.,  0.,  0.],
             [-1., -1.,  0., -1., -1.,  0.,  0.,  0.],
             [-2.,  0.,  1., -2., -1.,  0., -1.,  3.],
             [ 1., -1.,  0.,  0.,  2.,  3., -1.,  0.],
             [-1.,  0., -1.,  0.,  1., -1., -2., -1.],
             [ 0.,  0.,  0.,  1.,  1., -1.,  3.,  2.],
             [ 0., -2.,  2.,  0.,  1., -1., -1.,  0.],
             [ 0.,  1.,  0.,  0.,  0.,  2., -7.,  1.],
             [ 0.,  0., -1.,  0., -2.,  2.,  0.,  0.],
             [ 0.,  0.,  0.,  0.,  0., -1.,  1.,  0.],
             [ 0., -1.,  0., -2.,  0.,  0.,  0.,  0.]],
            [[ 1., -1., -1.,  0.],
             [ 1.,  1., -1., -1.],
             [ 0.,  0.,  1.,  0.],
             [-2., -1.,  0.,  0.],
             [ 0.,  1.,  0.,  0.],
             [ 0.,  1., -2.,  1.],
             [ 0.,  0.,  1.,  0.],
             [ 1., -3.,  2.,  2.]]
            ]
    
    this.b = [[-2.,  0.,  0.,  1.,  0.,  0.,  1., -1.,  1., -1.,  0., -3.,  0., -1.],
             [-1.,  0., -1.,  0.,  0.,  0.,  0.,  0.],
             [ 0., -2.,  0., -1.]
            ]
    }

    
}

valsAI = new InputValsAI()
brain = buildBrain(valsAI.c,valsAI.b)

function gameAI(){

    //Decrease snake energy for every step taken
    if(valsAI.xVel != 0 || valsAI.yVel != 0){valsAI.energy -= 1}
    
    //Update snake location
    valsAI.xLoc += valsAI.xVel;
    valsAI.yLoc += valsAI.yVel;


    //Draw Background
    context_ai.fillStyle = valsAI.backgroundColor;
    context_ai.fillRect(0, 0, canvas_ai.width, canvas_ai.height);


    //Add Grid horizontal and vertical lines
    context_ai.beginPath(valsAI.gridSize, 0);
    context_ai.lineWidth = String(valsAI.lineWidth);
    context_ai.strokeStyle = valsAI.lineColor

    for (let col = 1 ; col < valsAI.tileCount ; col++){
        context_ai.moveTo(valsAI.gridSize*col-valsAI.lineWidth, 0);
        context_ai.lineTo(valsAI.gridSize*col-valsAI.lineWidth, canvas_ai.width)
    }

    for (let row = 1 ; row < valsAI.tileCount ; row++){
        context_ai.moveTo(0, valsAI.gridSize*row-valsAI.lineWidth);
        context_ai.lineTo(canvas_ai.height, valsAI.gridSize*row-valsAI.lineWidth)
    }
    context_ai.stroke();


    //Add Border
    context_ai.beginPath();
    context_ai.lineWidth = String(valsAI.borderWidth);
    context_ai.strokeStyle = '#0076ff';
    context_ai.rect(0, 0, canvas_ai.width, canvas_ai.height);
    context_ai.stroke();


    //Draw Snake And Handle Tail and Food Collisions
    context_ai.fillStyle = 'lime';
    for(let i=0; i < valsAI.trail.length ; i++){
        context_ai.fillRect(valsAI.trail[i].x*valsAI.gridSize, valsAI.trail[i].y*valsAI.gridSize, valsAI.gridSize - 2, valsAI.gridSize - 2)

        //If the snakes tail overlaps with its head it bit itself, decrease length
        if(valsAI.trail[i].x==valsAI.xLoc && valsAI.trail[i].y == valsAI.yLoc && i!=0 && i!=valsAI.trail.length) {
            //tail = tailNaught
            valsAI.gameOn = false;
        }
    }
    valsAI.trail.push({x:valsAI.xLoc, y:valsAI.yLoc});

    //Trim trail down to length of tail if trial is longer than tail
    while(valsAI.trail.length>valsAI.tail){
        valsAI.trail.shift();
    }

    //If the snake finds an food, increase the length
    if(valsAI.xFood == valsAI.xLoc && valsAI.yFood == valsAI.yLoc){
        valsAI.tail++;
        
        //Increase previous score history
        valsAI.prevScore++;
        
        //Replenish energy
        valsAI.energy = valsAI.energyNaught;

        //Respawn a new food
        valsAI.xFood = Math.floor(Math.random()*valsAI.tileCount);
        valsAI.yFood = Math.floor(Math.random()*valsAI.tileCount);

        //If food overlaps snake, choose different random location
        let count = 0;
        while (count < valsAI.trail.length){
            for (loc in valsAI.trail){
                if (valsAI.trail[loc].x == valsAI.xFood && valsAI.trail[loc].y == valsAI.yFood){                    
                    //Change Food Location
                    valsAI.xFood = Math.floor(Math.random()*valsAI.tileCount);
                    valsAI.yFood = Math.floor(Math.random()*valsAI.tileCount);
                    count = 0;
                }
                count++
            }
        }
    }


    //Draw Food
    context_ai.fillStyle = valsAI.foodColor;
    context_ai.fillRect(valsAI.xFood*valsAI.gridSize, valsAI.yFood*valsAI.gridSize, valsAI.gridSize - 2, valsAI.gridSize - 2);


    //Game over if snake goes out of bounds
    if (valsAI.xLoc < 0 || valsAI.xLoc >= valsAI.tileCount || valsAI.yLoc < 0 || valsAI.yLoc >= valsAI.tileCount){
        valsAI.gameOn = false;
    }
    
    //If the snake runs out of energy then game over
    if (valsAI.energy<=0){valsAI.gameOn = false;}

    //HANDLE COLLISIONS
    if (!valsAI.gameOn){
        //reset snake position and velocity
        valsAI.xLoc = valsAI.xStart;
        valsAI.yLoc = valsAI.yStart;

        valsAI.xVel = valsAI.xVelStart;
        valsAI.yVel = valsAI.yVelStart;

        valsAI.tail = valsAI.tailNaught;
        
        valsAI.sleeping = true;
        valsAI.energy = valsAI.energyNaught;
        valsAI.gameOn = true;
        freezeGame.ai = true;
    }
    
    
    //Use snake vision to collect input values to feed the neural net
    var vision = snakeVision()
        
    //Pick the best direction to go based on the neural net
    var dir = useBrain(vision)
    
    
    //filter out options that lead to death
    if (valsAI.basicInstinct){
        var options = nonlethalOptions()
        //if(sum(options)<3){console.log(options)}
        
        var temp = []
        for (let i = 0; i<options.length; i++){
            temp.push(options[i]*dir[i]+0.001)
        }
        
        dir = temp;
    }
    
    //select remaining option with highest confidence from neural net
    dir = argMax(dir)
    
    if(!valsAI.sleeping && valsAI.humanFirst){
        //Change snakes direction based on best nonlethal option
        changeDirection(dir)
    }
    
}

function sum(arr){
    let s = 0;
    for (let i = 0; i<arr.length; i++){s+=arr[i];}
    return s
}

function nonlethalOptions(){
    /*Return array of booleans denoting whether it is safe to turn in a certain
    direction
    
    return [true, true, false, true]
    
    A direction is "safe" if the snake will not immediately die from moving in that direction
    */
    
    var snakeSpace = trailToArray(valsAI.trail);
    
    //Only check if the snake might bite itself if it is at least 5 units long
    if (snakeSpace.length>4){
        //Remove first and last element (head and tail tip) since the snake cannot move onto its own
        //head and the current tail-tip space will always be vacant in one frame
        snakeSpace.pop();
        //snakeSpace.shift();
    }
    
    var options = [];
    var choices = [[1, 0], [0, -1], [-1, 0], [0, 1]];  //right, up, left, down
    for (let i = 0; i < choices.length; i++){
        //flag for whether space is safe
        var safe = true;
        
        //change in direction
        let dx = choices[i][0];
        let dy = choices[i][1];
        
        //new location
        let x = valsAI.xLoc + dx;
        let y = valsAI.yLoc + dy;
        
        //check if movement takes snake out of bounds
        if ((x < 0 || x >= valsAI.gridSize) || (y < 0 || y >= valsAI.gridSize)){safe = false;}
        
        //check if movement makes the snake bite its own tail (if the snake is at least 5 units long)
        if (snakeSpace.length>4){
            for (let i = 0; i < snakeSpace.length; i++){
                if (arraysEqual([x,y],snakeSpace[i])){
                    //console.log(snakeSpace); 
                    safe = false; 
                    break;
                }
            }
        }
        
        options.push(safe)
            
    }
    
return options    
}

function changeDirection(dir){
    //Freeze AI if human alive and ai died
    if(!freezeGame.ai){
        //RIGHT, UP , LEFT, DOWN
        switch(dir){
            case 0:
                if (valsAI.xVel!=-1){
                    valsAI.xVel = 1;
                    valsAI.yVel = 0;
                    }
                break;
            case 1:
                if (valsAI.yVel!=1){
                    valsAI.xVel = 0;
                    valsAI.yVel = -1;
                    }
                break;
            case 2:
                if (valsAI.xVel!=1){
                    valsAI.xVel = -1;
                    valsAI.yVel = 0;
                    }
                break;
            case 3:
                if (valsAI.yVel!=-1){
                    valsAI.xVel = 0;
                    valsAI.yVel = 1;
                    }
                break;
        }
    }
}

function arraysEqual(arr1, arr2){
    /*Check if array one equals array 2
    arraysEqual([1,2], [1,2]) -> true
    arraysEqual([1,3], [2,4]) -> false
    
    */
    if (arr1 === arr2){return true};
    if (arr1 == null || arr2 == null){return false};
    if (arr1.length != arr2.length){return false};
    
    for (let i =0; i<arr1.length; i++){
        if (arr1[i] !== arr2[i]){return false};
    }
    return true;
}


function trailToArray(trail){
    /* convert snake trail from:
    [{x: 1, y:2}, {}, {},...] -->  [[1,2], [], [], ...] */
    var arrTrail = []
    for (let i = 0; i< trail.length ; i++){
        arrTrail.push([trail[i].x, trail[i].y])
    }
    return arrTrail
}



function snakeVision(){
    /*
    List of outputs that the snake sees, these outputs will be
    fed to the neural network to direct the snake
    
    outputs = [x dist from snakes head to food,
             y dist from snakes head to food,
             is food to the right of the snake,
             is food above the snake,
             is food to the left of the snake,
             is food below the snake,
             dist to nearest obstruction to the right,
             dist to nearest obstruction to the up-right,
             dist to nearest obstruction to the up,
             dist to nearest obstruction to the up-left,
             dist to nearest obstruction to the left,
             dist to nearest obstruction to the down-left,
             dist to nearest obstruction to the down,
             dist to nearest obstruction to the downright,
             snake is headed to the right 1 for true 0 for false
             snake is headed up 1 for true 0 for false
             snake is headed to the left 1 for true 0 for false
             snake is headed down 1 for true 0 for false
             ]    
    '''
    */
    
    var outputs = [];
    
    //TESTING PURPOSES ONLY USE THE HUMAN SNAKE VALS
    //outputs.push(vals.xFood-vals.xLoc);
    
    //Distance to food (will be scaled by gridSize to range from 0 to 1)
    outputs.push(valsAI.xFood - valsAI.xLoc);
    outputs.push(valsAI.yFood - valsAI.yLoc);
    
    //Is food to the right, above, to the left, or below the snake? 
    //(or some combination of two of these)
    if (valsAI.xLoc < valsAI.xFood){outputs.push(valsAI.gridSize)}else{outputs.push(0)};
    if (valsAI.yLoc > valsAI.yFood){outputs.push(valsAI.gridSize)}else{outputs.push(0)};
    if (valsAI.xLoc > valsAI.xFood){outputs.push(valsAI.gridSize)}else{outputs.push(0)};
    if (valsAI.yLoc < valsAI.yFood){outputs.push(valsAI.gridSize)}else{outputs.push(0)};
    
    
    //Current space taken up by snake
    var snakeSpace = trailToArray(valsAI.trail)
        
    //Distance to nearest obstruction (wall or snake tail) in 8 directions
    //right, up-right, up, up-left, left, down-left, down, down-right
    directions = [[1,0], [1,-1], [0,-1], [-1,-1],
                  [-1,0], [-1,1], [0,1], [1,1]];
    
    //if(vals.AI.yLoc>18){console.log(valsAI.yLoc)};
    
    directions.forEach(d => {
        let x = valsAI.xLoc;
        let y = valsAI.yLoc;
        let distance = 0;
        
        probe = true
        while (probe){

            
                        
            //Check if (x,y) probe has hit a wall
            if ((x <= 1 || x >= valsAI.gridSize -1) || (y <= 0 || y >= valsAI.gridSize-1)){probe = false;}
            
            
            
            //check if (x,y) probe is on the snakes tail
            if(valsAI.trail.length > 1){
                for (let i = 1; i < snakeSpace.length; i++){
                    if (arraysEqual([x,y],snakeSpace[i])){
                        //console.log(snakeSpace); 
                        probe = false; 
                        break;
                    }
                }
            }
            
  
            x+=d[0];
            y+=d[1];
            distance+=1;
        }
    
        outputs.push(distance)
    })    
    
    //Lastly lets tell the snake what direction it is currently headed:
    //right 0|1 , up 0|1, left 0|1, down 0|1
    if(valsAI.xVel == 1){outputs.push(valsAI.gridSize)}else{outputs.push(0)}
    if(valsAI.yVel == -1){outputs.push(valsAI.gridSize)}else{outputs.push(0)}
    if(valsAI.xVel == -1){outputs.push(valsAI.gridSize)}else{outputs.push(0)}
    if(valsAI.yVel == 1){outputs.push(valsAI.gridSize)}else{outputs.push(0)}
    
    //Normalize Outputs to have a maximum magnitude of 1
    for (let i = 0; i < outputs.length; i++){
        outputs[i] /= valsAI.gridSize;
    }
    
    return outputs
}


function buildBrain(c,b){
    //Build neural net from a list of input weights
    const input = tf.input({shape: [18]});
    const dense1 = tf.layers.dense({units: 14, activation: 'relu', weights:[tf.tensor(c[0]),tf.tensor(b[0])]}).apply(input);
    const dense2 = tf.layers.dense({units: 8, activation: 'relu', weights:[tf.tensor(c[1]),tf.tensor(b[1])]}).apply(dense1);
    const output = tf.layers.dense({units: 4, activation: 'sigmoid', weights:[tf.tensor(c[2]),tf.tensor(b[2])]}).apply(dense2);
    const model = tf.model({inputs:input, outputs: output});
        
    return model
}

function argMax(array){
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

function useBrain(visionInput){
    /*Make direction predictions (right, up , left, down) by passing
    snake vision as inputs to the snake brain (nerual net)*/
    
    //Convert snake vision to tensorflow tensor
    var input = tf.tensor(visionInput, [1,18])
    
    //use neural net to predict the best direction the snake should turn [right, up, left, down]
    var nnOutput = brain.predict(input).dataSync()
    
    //Convert output to a list
    var temp = []
    for (let i = 0; i<nnOutput.length; i++){temp.push(nnOutput[i])};

    //return the index of the best choice
    return temp
    }