// All Variables
let snakeSpeed = 1;
const gameboard = document.querySelector(".gamebox");



let lastPaintTime = 0; 


let inputDirection = { x: 0, y: 0 };
let snakeBody = [
    { x: 8, y: 8 }
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
    snakeBody.forEach(element => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.style.gridRowStart = element.y;
        
        snakeElement.classList.add("snakeBody");
        gameboard.appendChild(snakeElement);
        
    });
}


function snakeMove() {
    // snakeBody[0].x += 1;   
    // snakeBody[0].y += 0;
    inputDirection = getInputDirection();
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

function getInputDirection() {
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp': inputDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown': inputDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft': inputDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight': inputDirection = { x: 1, y: 0 };
                break;
            default: inputDirection = {x:0, y:0};
                break;
        }       
    })
    return inputDirection; 
}