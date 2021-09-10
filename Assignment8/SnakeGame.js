//Game Variables
let direction = {x: 0, y: 0}; 
let speedLimit = 2;
let lastPaintTime=0;//last time kahila paint bhako
let arrOfSnake = [{x: 10, y: 15}];
let food = {x: 5, y: 6};
let score =0;

document.getElementById('gameover').style.visibility='hidden';
document.getElementById('endBox').style.visibility='hidden';
document.getElementById('menu').style.visibility='visible';
//after start button clicked
const startNew = document.getElementById('sbtn');
startNew.addEventListener('click', function(){
    document.getElementById('menu').style.visibility='hidden';
    // main();
});

//Game Functions
function main(currentTime){// ctime jun time ma run huncha tyo dincha
    window.requestAnimationFrame(main);//gameloop
    if((currentTime - lastPaintTime)/1000 < 1/speedLimit){// fps rakhni
        return;//dont rnder and wait for condition to be false.
    }
    lastPaintTime = currentTime;
    game();
}

//Collision Function
function isCollide(snake) {
    // Collision with ownself.
    for (let i = 1; i < arrOfSnake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // Collision on wall.
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
     return false;
}

function game(){
    //updating arrOfSnake and food
    //Restarting game if collision occurs.
    if(isCollide(arrOfSnake)){
        direction = {x: 0, y: 0}; 
        arrOfSnake = [{x: 10, y: 15}];
        score = 0; 
        // alert('game over. Press any key to restart');
        // after collision
        document.getElementById('gameover').innerHTML='Game Over'
        document.getElementById('gameover').style.visibility='visible';
        document.getElementById('endBox').style.visibility='visible';
        document.getElementById('menu').style.visibility='hidden';
    

        //after restart button clicked
        const restart = document.getElementById('restart');
        restart.addEventListener('click', function(){
            document.getElementById('gameover').style.visibility='hidden';
            document.getElementById('endBox').style.visibility='hidden';
            main();
        });

        //after quit button clicked
        const end = document.getElementById('quit');
        end.addEventListener('click', function(){
            document.getElementById('gameover').style.visibility='hidden';
            document.getElementById('endBox').style.visibility='hidden';
            document.getElementById('menu').style.visibility='visible';
        });

        //after start game button clicked.
        const startNew = document.getElementById('sbtn');
        startNew.addEventListener('click', function(){
            document.getElementById('menu').style.visibility='hidden';
            main();
        });
    }
    
    // Regenerating food and incrementing the snake body
    if(arrOfSnake[0].y === food.y && arrOfSnake[0].x ===food.x){
        // snake body increment
        arrOfSnake.unshift({x: arrOfSnake[0].x + direction.x, y: arrOfSnake[0].y + direction.y});
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        //food regenerate.
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i =arrOfSnake.length - 2; i>=0; i--) { 
        arrOfSnake[i+1] = {...arrOfSnake[i]};
    }
    arrOfSnake[0].x += direction.x;
    arrOfSnake[0].y += direction.y;

    //displaying array and food
    //Emptying the contrainer.
    container.innerHTML = "";
    //Creating a new element  for snake, giving some styling and displaying it.
    arrOfSnake.forEach((n, index) => {
        newSnakeElement = document.createElement('div');
        newSnakeElement.style.gridRowStart = n.y; 
        newSnakeElement.style.gridColumnStart = n.x;
        if(index === 0){
            newSnakeElement.classList.add('head')
        }
        else{
            newSnakeElement.classList.add('snake') //css liyeko
        }
        container.appendChild(newSnakeElement);
     })

    //Creating a new element  for food, giving some styling and displaying it.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    container.appendChild(foodElement);//aaddgareko
}

//requestAnimationFrame used instead of set interval and all.
window.requestAnimationFrame(main);
//Using addEventListener to manipulate keys
window.addEventListener('keydown', n =>{
    direction = {x: 0, y: 1};
    // Arrow controls
    switch (n.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }

})