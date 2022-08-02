// All Variables
let snakeSpeed = 2;
let lastPaintTime = 0;//इसको  screenPaint Function के अंदर लिखने से काम नहीं कर रहा है sir से पूछना है
let gameBox = document.querySelector(".gamebox");





let inputDirection = { x: 0, y: 0 };
let snakeBody = [
    { x: 8, y: 8 }
]



// GameLoop
function screenPaint(currentTime) {     //यहां पर ये currentTime को parameter की तरह क्यों use नहीं किया गया Line no. 36 में..?
    window.requestAnimationFrame(screenPaint);

    if ((currentTime - lastPaintTime) / 1000 < 1 / snakeSpeed) {
        return;
    }
    lastPaintTime = currentTime;
    // console.log(currentTime);

    drow();
    update();


}



// Game Logic
window.requestAnimationFrame(screenPaint);





// All Functions Definations

function drow() {
    snakeBody.forEach(element => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.style.gridRowStart = element.y;

        snakeElement.classList.add("snakeBody");
        gameBox.appendChild(snakeElement);

    });
}

function update() {
    inputDirection = getInputDirection();
    snakeMove();
}


function snakeMove() {
    //snakeBody[0].x += 1;   //यहां पर + और = की Position Change करने से फरक पड़ रहा है क्यों..??
    //snakeBody[0].y += 0;
    // gameBox.innerHTML = "";
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