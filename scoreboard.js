class scoreBoard{
    constructor(){
        //Grid Properties
        this.borderWidth = 6;
        this.borderColor = 'blue';
        this.backgroundColor = 'black';
        
        //Current level
        this.level = 1;
        
        //Score of each team
        this.scoreAI = valsAI.trail.length;
        this.scoreHuman = vals.trail.length;
        
        this.titleAI = 'AI';
        this.title = 'Human';
        }
    }

sb = new scoreBoard()

function drawScoreBoard(){
    //Draw Background for human scoreboard
    context_sb.fillStyle = sb.backgroundColor;
    context_sb.fillRect(0, 0, canvas_sb.width, canvas_sb.height);
    
    //draw background for ai scoreboard
    context_sb_ai.fillStyle = sb.backgroundColor;
    context_sb_ai.fillRect(0, 0, canvas_sb_ai.width, canvas_sb_ai.height);
    
    //Add Border to human score board
    context_sb.beginPath();
    context_sb.lineWidth = String(sb.borderWidth);
    context_sb.strokeStyle = '#0076ff';
    context_sb.rect(0, 0, canvas_sb.width, canvas_sb.height);
    context_sb.stroke();
    
    //Add Border to ai score board
    context_sb_ai.beginPath();
    context_sb_ai.lineWidth = String(sb.borderWidth);
    context_sb_ai.strokeStyle = '#0076ff';
    context_sb_ai.rect(0, 0, canvas_sb_ai.width, canvas_sb_ai.height);
    context_sb_ai.stroke();
    
    //Add title to human score board
    context_sb.font = 'lighter 35px cursive'
    context_sb.strokeStyle = 'white'
    context_sb.textAlign = 'center'
    context_sb.strokeText('H u m a n', canvas_sb.width/2, canvas_sb.height/2)
    
    //Add title to ai score board
    context_sb_ai.font = 'lighter 35px cursive'
    context_sb_ai.strokeStyle = 'white'
    context_sb_ai.textAlign = 'center'
    context_sb_ai.strokeText('A I', canvas_sb_ai.width/2, canvas_sb_ai.height/2)
    
    //Add human score to score board
    context_sb.font = 'lighter 20px cursive'
    context_sb.strokeStyle = 'white'
    context_sb.textAlign = 'left'
    if(!freezeGame.human){current_score_human = String(vals.trail.length);}else{current_score_human=String(vals.prevScore);}
    context_sb.strokeText('S c o r e : '.concat(current_score_human), 0.02*canvas_sb.width, 0.85*canvas_sb.height)
    
    //Add AI score to score board
    context_sb_ai.font = 'lighter 20px cursive'
    context_sb_ai.strokeStyle = 'white'
    context_sb_ai.textAlign = 'left'
    if(!freezeGame.ai){current_score_ai = String(valsAI.trail.length);}else{current_score_ai=String(valsAI.prevScore);}
    context_sb_ai.strokeText('S c o r e : '.concat(current_score_ai), 0.02*canvas_sb_ai.width, 0.85*canvas_sb_ai.height)
    
    //Add human lifebar
    human_hp = vals.energy/vals.energyNaught
    energy_red = 255*(1-human_hp)
    energy_green = 255*human_hp
    energy_color = 'rgb(';
    energy_color = energy_color.concat(String(energy_red),',',String(energy_green),',0)')
    context_sb.fillStyle = energy_color;
    context_sb.fillRect(0.6*canvas_sb.width, 0.6*canvas_sb.height, 0.35*human_hp*canvas_sb.width, 0.3*canvas_sb.height)
    
    //Add AI lifebar
    AI_hp = valsAI.energy/valsAI.energyNaught
    energy_red = 255*(1-AI_hp)
    energy_green = 255*AI_hp
    energy_color = 'rgb(';
    energy_color = energy_color.concat(String(energy_red),',',String(energy_green),',0)')
    context_sb_ai.fillStyle = energy_color;
    context_sb_ai.fillRect(0.6*canvas_sb_ai.width, 0.6*canvas_sb_ai.height, 0.35*AI_hp*canvas_sb_ai.width, 0.3*canvas_sb_ai.height)
    }