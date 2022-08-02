// All Variables
let snakeSpeed = 1;
const gameboard = document.querySelector(".gamebox");
let lastPaintTime = 0; 


let inputDirection = { x: 0, y: 0 };
let lastInput = inputDirection;
let snakeBody = [
    { x: 8, y: 8 },
    { x: 9, y: 8 },
    { x: 10, y: 8 },
    { x: 11, y: 8 },
    { x: 12, y: 8 }
]



// GameLoop
function screenPaint(currentTime) {     
    window.requestAnimationFrame(screenPaint);

    if ( ((currentTime - lastPaintTime) / 1000) < (1 / snakeSpeed) ) {
        return;
    }
    lastPaintTime = currentTime;
    console.log(currentTime);
    
    update();
    drow();
    
    
}



// Game Logic
window.requestAnimationFrame(screenPaint);





// All Functions Definations

function drow() {
   drowSnake();
}

function update() {
    gameboard.innerHTML = "";
    snakeMove();
}

function drowSnake() {
    snakeBody.forEach((element, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.style.gridRowStart = element.y;
        
        snakeElement.innerHTML=index;
        if (index==0) {
            snakeElement.classList.add("snakeHead");
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

}

function getInputDirection() {
    window.addEventListener('keydown', e => {
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