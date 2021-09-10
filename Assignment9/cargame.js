const score = document.querySelector('.score');
const startMenu = document.querySelector('.startMenu');
const gameArea = document.querySelector('.gameArea');

// arrow controls
let keys = {ArrowUp:false, ArrowDown:false, ArrowRight:false, ArrowLeft:false};
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

startMenu.addEventListener('click', start);

let player = { speed : 5, score : 0};

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
} 

function isCollide(a,b) {
        aRect = a.getBoundingClientRect();
        bRect = b.getBoundingClientRect();
        return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom ) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}
    
// road white line movement.
function moveLines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(item){
        if(item.y >= 700){
            item.y = -50; 
        }
        item.y += player.speed;
        item.style.top= item.y + "px";
    })
}

// Game Over Box
function endGame(){
    player.start=false;
    startMenu.classList.remove("hide");
    startMenu.innerHTML = 'Game Over<br> your final score is:' + player.score + '<br>press here to restart';
}

//moving non player car
function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(isCollide(car, item)){
            // console.log("boom hit");
            endGame();
        }
        if(item.y >= 700){
            item.y = -300; 
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }
        item.y += player.speed;
        item.style.top= item.y + "px";
    })
}

 //game play functions
 function gamePlay(){
    let road = gameArea.getBoundingClientRect();
    let car = document.querySelector('.car');

    if(player.start){
        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > (road.top + 70)){player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 85)){ player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width - 50)){player.x += player.speed}

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px'; 

        window.requestAnimationFrame(gamePlay);

        score.innerText=" score:   " + player.score;
        player.score++;
    }
}

// game start menu
function start(){
    startMenu.classList.add('hide');
    gameArea.innerHTML='';
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);

    // creating road lines
     for(x=0; x<5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + 'px';
        gameArea.appendChild(roadLine);
    }

    //creating div car
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // creating enemy car
    for(x=0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + 'px';
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
        gameArea.appendChild(enemyCar);
        }

}

function randomColor(){
    function c(){
        let hex= Math.floor(Math.random()*256).toString(16);
        return ("0" + String(hex)).substr(-2);  
    }
  return "#" + c() +c() +c();
}

