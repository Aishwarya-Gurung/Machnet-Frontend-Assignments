// Getting canvas in js.
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//Variables
let frames = 0;
var paused = false;

//Loading images
let pictures = new Image(); 
pictures.src =  'img/sprite.png';

// Loading sounds
let point = new Audio();
point.src = "audio/sfx_point.wav";

let flap = new Audio();
flap.src = "audio/sfx_flap.wav";

let hit = new Audio();
hit.src = "audio/sfx_hit.wav";

let swooshing = new Audio();
swooshing.src = "audio/sfx_swooshing.wav";

let die = new Audio();
die.src = "audio/sfx_die.wav";

// Game states
const state={
	current :0,
	getReady:0,
	game:1,
	gameOver:2,
}

//Eventlistener of different game states
cvs.addEventListener("click", function(event){
    switch(state.current){
        case state.getReady:
        state.current=state.game;
        swooshing.play(); 
        break;

        case state.game:
        bird.move();
        flap.play();
        break;

        case state.gameOver:
        let rect = cvs.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;
            
       // CHECK IF WE CLICK ON THE START BUTTON
        if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
            state.current = state.getReady;
            pipes.reset();
            score.reset();
        }
        break;
    }
})

// Start button cordinates.
const startBtn = {
    x : 720,
    y : 373,
    w : 83,
    h : 29
}

//Event listener of pause
document.addEventListener('keydown', function (e) {
    var x = e.keyCode;
    if (x === 80){// p key
    togglePause();
    }
});

//Function to pause game
function togglePause(){
    if (!paused){
    	paused = true;
        cvs.style.opacity = 0.5;
	} else if (paused){
    	paused= false;
       	cvs.style.opacity = 1;
    }
}

//Get ready state
const getReady = {
	sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : (cvs.width/2)-(173/2),
    y : 200,

    draw:function(){
    	if(state.current==state.getReady){
    		ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    	}
    }
}

//Get over state
const gameOver = {
	sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : (cvs.width/2)-(225/2),
    y : 200,

    draw:function(){
    	if(state.current==state.gameOver){
    		ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    	}
    }
}

//Background
let background = {
	sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : cvs.height - 226,

    // Draw function for background
    draw : function(){
    	ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (2*this.w), this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (3*this.w), this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (4*this.w), this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (5*this.w), this.y, this.w, this.h); 
    }
}

// Ground
let ground = {
	sX : 276,
    sY : 0,
    w : 224,
    h : 112,
    x : 0,
    y : cvs.height - 112,

    //For moving ground
    dx : 3,

    // Draw function for ground
    draw : function(){
    	ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (2*this.w), this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (3*this.w), this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (4*this.w), this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (5*this.w), this.y, this.w, this.h);
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (6*this.w), this.y, this.w, this.h);
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (7*this.w), this.y, this.w, this.h); 
        ctx.drawImage(pictures, this.sX, this.sY, this.w, this.h, this.x + (8*this.w), this.y, this.w, this.h);  
    }, 

    //Update function for ground
    update : function(){
    	if(state.current==state.game){
    	    //To move road.
    		this.x = this.x-this.dx;
    		if(this.x%112==0){
    			this.x = 0;
    		}
	  	}
    } 
}

//Bird
const bird = {
	animation:[
		{sX:276, sY:112},
		{sX:276, sY:139},
		{sX:276, sY:164},
		{sX:276, sY:139},
	],

	x:50,
	y:150,
	w:34,
	h:26,

    // Prperty for bird flap
	frame:0,
	period:5,

    //For bird fall and jump
	speed:0,
	gravity:0.20,
	jump:4.6,

    //For collision
	radius:13,

    //Draw function of bird
	draw:function(){
		let bird = this.animation[this.frame];
		ctx.drawImage(pictures, bird.sX, bird.sY, this.w, this.h, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
	},

    //Update function of Bird
	update : function(){
		// Bird must flap slowly if in ready state.
        this.period = state.current == state.getReady ? 10 : 5;

		//Bird flap
		this.frame+=frames%this.period==0 ? 1:0;
		this.frame=this.frame%this.animation.length;
		
		//Bird falling down
		if(state.current==state.getReady){
			this.y=150;
		}else{
			this.y=this.y+this.speed; 
			this.speed=this.speed+this.gravity;
		}

        //Bird ground position setting
		if(this.y+this.h/2 >= cvs.height - ground.h){
			this.speed=0;
			this.frame=0;
            //For no sound repeat
			if(state.current==state.game){
				state.current=state.gameOver;
				die.play();
			}
		}
	},

	//Bird jumping
	move:function(){
		this.speed= - this.jump;
	}
}

//Pipes
const pipes = {
    position : [],
    
    top : {
        sX : 553,
        sY : 0
    },
    bottom:{
        sX : 502,
        sY : 0
    },
    
    w : 53,
    h : 400,
    gap : 200, 
    maxYPos : -150,
    dx : 3,

    // Draw function of pipes
     draw : function(){
        for(let i  = 0; i < this.position.length; i++){
            let p = this.position[i];
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;
            
            // top pipe
            ctx.drawImage(pictures, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
            
            // bottom pipe
            ctx.drawImage(pictures, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
        }
     },

    // Update function of pipes
    update: function(){
    	if(state.current !== state.game) {
    		return;
    	}
         // Condition for when Top pipe to be added in array.
        if(frames%150 == 0){
           this.position.push({
                x : cvs.width,
                y : this.maxYPos * ( Math.random() + 1)
            });
        }

        //Moving and deleting the pipes
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            //Moving the pipes
            p.x -= this.dx;
       
            // Deleting the pipes
       		if(p.x + this.w <= 0){
             	this.position.shift();
                point.play();
                score.value += 1;
                score.best = Math.max(score.value, score.best); 
                localStorage.setItem("best", score.best);
            }

            // COLLISION DETECTION
            // TOP PIPE
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){
                hit.play();
                state.current = state.gameOver;
            }

            // BOTTOM PIPE
            let tobp=p.y+this.h+this.gap;
            let bobp=p.y+this.h+this.gap+this.h;

			if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius >tobp && bird.y - bird.radius < bobp){
                hit.play();
                state.current = state.gameOver;
            }
        }
    },

    //Emptying the position array when reset
    reset:function(){
    	this.position=[];
    }
}

//Score 
const score = {
	best : parseInt(localStorage.getItem("best")) || 0,
	value:0,

    //Draw function of score
	draw:function(){
		ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        
        if(state.current == state.game){
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);
            
        }else if(state.current == state.gameOver){
            // SCORE VALUE
            ctx.font = "25px Teko";
            ctx.fillText(this.value, cvs.width/2+65, 300);
            ctx.strokeText(this.value, cvs.width/2+65, 300);
            // // BEST SCORE
            ctx.fillText(this.best, cvs.width/2+65, 340);
            ctx.strokeText(this.best,cvs.width/2+65, 340);
        }
	},

    //Setting the value to 0 after reset
	reset:function(){
		this.value=0;
	}
}

//Main draw function
function draw(){
	
	ctx.fillStyle='#70c5ce';
	ctx.fillRect(0, 0, cvs.width, cvs.height);

	background.draw();
	pipes.draw();
	ground.draw();
	bird.draw();
	getReady.draw();
	gameOver.draw();
	score.draw();
}

//Main update function (all logics)
function update(){
	ground.update();
	bird.update();
	pipes.update();
}

//Loop function
function main(){
	draw();

	if(!paused){ 
		update(); 
	}

	frames++;
	requestAnimationFrame(main);
}
main();