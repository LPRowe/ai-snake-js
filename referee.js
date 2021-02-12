//When human or ai dies, freeze game until the other dies
var freezeGame = {'human': false, 'ai' : false};
//Control the pace of the game 1000/12 for humans 1000/50 for fast play ai
var blitSpeed = 1000/12;

//Keep track of the score for each round and who won
//var human_score = [10, 9, 7];
//var ai_score = [9, 12, 5];
var human_score = [];
var ai_score = [];

function run(){
    //Onload scripts for games and headers
    window.onload = function(){
        //Canvases for snake game human and ai
        canvas = document.getElementById('gc');
        canvas_ai = document.getElementById('gc_ai');

        //Canvases for Scoreboards (human and ai)
        canvas_sb = document.getElementById('score');
        canvas_sb_ai = document.getElementById('score_ai');

        //Context for human and ai snake game
        context = canvas.getContext('2d');
        context_ai = canvas_ai.getContext('2d');

        //Context for human and ai score board
        context_sb = canvas_sb.getContext('2d');
        context_sb_ai = canvas_sb_ai.getContext('2d');
        
        //Canvas and context for plots
        canvas_plots = document.getElementById('stats');
        canvas_pi = document.getElementById('stats_pi');
        
        context_plots = canvas_plots.getContext('2d');
        context_pi = canvas_pi.getContext('2d');

        document.addEventListener('keydown',keyPush);

        //run and blit each window individually
        humanWindow = setInterval(() => {game()}, blitSpeed);
        aiWindow = setInterval(() => {gameAI()}, blitSpeed/8);
        setInterval(drawScoreBoard, blitSpeed);
        setInterval(monitorPlay, blitSpeed);
    }
}

function monitorPlay(){
    if(vals.xVel == 0 && vals.yVel==0 && valsAI.xVel==0 && valsAI.yVel==0 && (freezeGame.human || freezeGame.ai)){
        console.log('unfreeze')
        
        //unfreeze game screens
        freezeGame.human = false;
        freezeGame.ai = false;
        
        //record scores
        human_score.push(vals.prevScore)
        ai_score.push(valsAI.prevScore)
        
        //plot current stats
        plotScores();
        
        //reset prv scores
        vals.prevScore = 1;
        valsAI.prevScore = 1;

    }
}

function plotScores(){
    var rounds = []
    for(let i = 1; i<human_score.length + 1; i++){rounds.push(i)}
    
    //reset charts
    chart = {}
    pi_chart = {}
    
    //LINE PLOT
    var chart = new Chart(context_plots, {
    // The type of chart we want to create
    type: 'line',
    options: {scales:{yAxes: [{ticks: {beginAtZero: true}}]}, 
              responsive: false, 
              hover:false,
             layout:{padding:{left: 10, right:10, top:10, bottom:10}}
                          },
    // The data for our dataset
    data: {
        labels: rounds,
        datasets: [

            {
            label: 'AI Score',
            //backgroundColor: 'rgb(99, 255, 99)',
            borderColor: 'rgb(99, 129, 255)',
            data: ai_score,
            borderWidth: 5
            },
            
            {
            label: 'Human Score',
            backgroundColor: 'rgb(99, 255, 99, 0.6)',
            borderColor: 'rgb(18, 239, 18)',
            data: human_score,
            borderWidth: 5
            },
            
            ]
        },
    });
    
    
    //PIE PLOT DATA
    human_wins = 0
    ai_wins = 0
    for(let i = 0; i < rounds.length; i++){
        if(human_score[i] >= ai_score[i]){human_wins++}
        else{ai_wins++}
    }
    
    
    var pi_chart = new Chart(context_pi,
         {"type":"doughnut",
          "options":{responsive: false, hover: false},
          "data":{"labels":["Human Victories","AI Victories"],
                  "datasets":[{"data":[human_wins,ai_wins],
                               "backgroundColor":["rgb(99, 255, 99)","rgb(99, 129, 255)"]}
                             ]
                 }
         }
    );
    
    
}