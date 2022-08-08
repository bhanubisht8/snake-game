// All Variables
let snakeSpeed = 10;
const gameboard = document.querySelector(".gamebox");
let score = 0;
let scoreBoard = document.getElementById("scoreValue");
let lastPaintTime = 0; 
const foodSound = new Audio('food.mp3');
const gameMusic = new Audio('music.mp3');
const moveMusic = new Audio('move.mp3');
const goveOverSound = new Audio('gameover.mp3');


const snakeIncrement = 1;
let inputDirection = { x: 0, y: 0 };
let lastInput = inputDirection;
let food = {x:(Math.floor(Math.random()*18)), y:(Math.floor(Math.random()*18))};

let snakeBody = [
    { x: 8, y: 8 },
 ]




// GameLoop
function screenPaint(currentTime) {     
    window.requestAnimationFrame(screenPaint);

    if ( ((currentTime - lastPaintTime) / 1000) < (1 / snakeSpeed) ) {
        return;
    }
    lastPaintTime = currentTime;
    // console.log(currentTime);
    
    update();
    drow();
    
    gameMusic.play();
    
}



// Game Logic


let hiscore = localStorage.getItem("hiscore");

if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScoreValue.innerHTML =  hiscore;
}
window.requestAnimationFrame(screenPaint);


// All Functions Definations

function drow() {
   drowSnake();
   drowFood();
}

function update() {
    gameboard.innerHTML = "";
    snakeMove();
    snakeEatingFood();
}

function drowSnake() {
    snakeBody.forEach((element, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.style.gridRowStart = element.y;
        // snakeElement.innerHTML=index;
        snakeElement.style.transform = "rotate(0deg)";
        if (index==0) {
            snakeElement.classList.add("snakeHead");
            if (inputDirection.x==1) {
                snakeElement.style.transform = "rotate(-90deg)";
            } else if(inputDirection.x==-1){
                snakeElement.style.transform = "rotate(90deg)";
            } else if(inputDirection.y==-1){
                snakeElement.style.transform = "rotate(180deg)";
            }
        }else{
            snakeElement.classList.add("snakeBody");
        }
        gameboard.appendChild(snakeElement);
        
    });
}


function snakeMove() {
    // snakeBody[0].x += 1;   
    // snakeBody[0].y += 0;
    inputDirection = getInputDirection();
    for (i=snakeBody.length-2; i >= 0 ; i--){
       snakeBody[i+1]={...snakeBody[i]};  
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    checkGameOver();

}

function getInputDirection() {
    window.addEventListener('keydown', e => {
        moveMusic.play();
        switch (e.key) {

            case 'ArrowUp': 
            if (lastInput.y==1) {
                return;
            }
            inputDirection = { x: 0, y: -1 };

                break;
                
            case 'ArrowDown': 
            if (lastInput.y==-1) {
                return;
            }
            inputDirection = { x: 0, y: 1 };
                break;

            case 'ArrowLeft': 
            if (lastInput.x==1) {
                return;
            }
            inputDirection = { x: -1, y: 0 };
                break;

            case 'ArrowRight': 
            if (lastInput.x==-1) {
                return;
            }
            inputDirection = { x: 1, y: 0 };
                break;
            default: inputDirection = {x:0, y:0};
                break;
        }       
    })
    lastInput=inputDirection;
    return inputDirection; 
}

function drowFood() {

    let foodElement = document.createElement('div');

     
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    
    foodElement.classList.add('food');

    gameboard.appendChild(foodElement);
}

function snakeEatingFood() {
    if (snakeBody[0].x == food.x && snakeBody[0].y == food.y) {
        // console.log("Food Eaten");
        // console.log(snakeBody);
        score +=10;
        scoreBoard.innerHTML = score;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            // hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            highScoreValue.innerHTML = hiscoreval;
        }
        foodSound.play();
       food = foodRandomPostion();
        for(i=0; i<snakeIncrement; i++){
            snakeBody.push(snakeBody[snakeBody.length-1]);
            // console.log(i);
            // console.log(snakeIncrement);
        }
    }
}

function foodRandomPostion() {

    let a, b,  myCondition = true;

    let c = 2;
    let d = 17;

    
    
    while (myCondition) {
        a = Math.floor((d-c)*Math.random() + c);
        b = Math.floor((d-c)*Math.random() + c);
        myCondition = snakeBody.some(segment=>{
            return  (segment.x==a && segment.y==b);
        })
    }

    console.log(a,b);
        return {x : a, y: b}

        
}

function checkGameOver() {
    if (snakeIntersect() || snakeOutOfBoundary()) {
        location.reload();
        gameMusic.pause();
        goveOverSound.play();
        alert("Game Over");
    }
    
}

function snakeOutOfBoundary(){
    return snakeBody[0].x < 1 || snakeBody[0].x > 18 || snakeBody[0].y < 1 || snakeBody[0].y > 18;
}

function snakeIntersect() {
    for(i=1; i<snakeBody.length; i++){
        if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y){
            return true;
        }
    }
}