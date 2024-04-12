
/*
Here we're storing a reference to the <canvas> element to the canvas variable. 
Then we're creating the ctx variable to store the 
2D rendering context — the actual tool we can use to paint on the Canvas.
*/
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// paddle vars
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;


// detect pressed buttons for paddle  (false because at beginning control buttons are not pressed)
let rightPressed = false;
let leftPressed = false;


// const var refers to the radius of the player circle (ball) and used for calculations
const ballRadius = 10;

// non hard-coded STARTING position of the ball (the CENTER of the ball) will be determined by x and y vals
let x = canvas.width / 2;
let y = canvas.height - 30;

// delete this console msg later
console.log("starting position of ball is x: " + x + " and y: " + y);

/*
add a small value to x and y after every frame has been drawn to make it 
appear that the ball is moving. Let's define these small values 
as dx and dy and set their values to 2 and -2 respectively (SPEED MOVEMENT VARS).*/
let dx = 2;
let dy = -2;


// const VARS means cannot be modified
// let VARS can be modified
//  colors for the ball (array)
// initial color is blue
const listOfColors = ["blue", "green", "red", "orange", "yellow", "pink", "cyan"];
let color = "white";

// store reference to heading 2 which displays current color
let colorString = document.getElementById("myColor");

// brick vars
/* Here we've defined the number of rows and columns of bricks, their width and height, the padding between the bricks 
so they won't touch each other and a top and left offset so they won't start being drawn right from the edge of the Canvas. */
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0; // game score counter for the game

// list of bricks (Array)
let bricks = [];
// initialize and store bricks in array
/* We will hold all our bricks in a two-dimensional array. It will contain the brick columns (c), 
which in turn will contain the brick rows (r), which in turn will each contain an object containing
the x and y position to paint each brick on the screen and a status property that is 1 if it should be drawn
or 0 if it shouldnt be drawn. */
for (let c = 0; c < brickColumnCount; c++){
     bricks[c] = [];
     for (let r = 0; r < brickRowCount; r++){
          bricks[c][r] = {x: 0, y: 0, status: 1};
     }
}
// listen for key presses by setting up two event listenres
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// listen for mouse movement
document.addEventListener("mousemove",mouseMoveHandler,false);

/*This function will detect for the event that user presses arrow right key (or right key for other browsers such as Edge),
or arrow left key (or left key for other browsers such as Edge).*/
function keyDownHandler(e){
     if (e.key === "Right" || e.key === "ArrowRight"){
          rightPressed = true;
     }
     else if (e.key === "Left" || e.key === "ArrowLeft"){
          leftPressed = true;
     }
}


/*This function will detect for the event that user stops pressing the right or left keys.*/
function keyUpHandler(e) {
     if (e.key === "Right" || e.key === "ArrowRight") {
          rightPressed = false;
     }
     else if (e.key === "Left" || e.key === "ArrowLeft") {
          leftPressed = false;
     }
}

function mouseMoveHandler(e){
     /*
     In this function we first work out a relativeX value, which is equal 
     to the horizontal mouse position in the viewport (e.clientX) minus the distance between the left edge of the canvas
      and left edge of the viewport (canvas.offsetLeft) — effectively this is equal to the distance between the canvas left edge
       and the mouse pointer. If the relative X pointer position is greater than zero and lower than the Canvas width, 
       the pointer is within the Canvas boundaries, and the paddleX position (anchored on the left edge of the paddle) is 
       set to the relativeX value minus half the width of the paddle, so that the movement will actually be relative to the 
       middle of the paddle.

     The paddle will now follow the position of the mouse cursor, but since we're restricting the movement to the size of the Canvas,
     it won't disappear completely off either side.
     */
     const relativeX = e.clientX - canvas.offsetLeft;
     if (relativeX > 0 && relativeX < canvas.width){
          paddleX = relativeX - paddleWidth / 2;

          // check if the paddle tries to leave the screen (when using mouse controls) from either wall
          // then keep its x position within the left and right wall boundaries
          if (paddleX < 0)
          {
               paddleX = 0;
          }
          else if (paddleX > canvas.width - paddleWidth){
               paddleX = canvas.width - paddleWidth;
          }
     }
}


/* This function keeps track of when any bricks are hit by the ball.  
It will make a brick disappear and reverse the ball if they make contact with each other. */
function collisionDetection(){
     for (let c = 0; c < brickColumnCount; c++){
          for (let r = 0; r < brickRowCount; r++){
               let b = bricks[c][r]; // declare a brick object
               // status 1 means the brick has been drawn already so its  visible on the screen
               if (b.status == 1){
                    // check when the CENTER of the ball falls within a bricks coordinates then reverse balls direction
                    // status is set to 0 so brick doesnt get drawn on next frame
                    if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                         dy = -dy;
                         b.status = 0;
                         score++; // increase player score when brick is hit
                         if (score == brickRowCount * brickColumnCount){
                              alert(`YOU WIN, CONGRATS! YOUR HIGH SCORE WAS ${score}`);
                              document.location.reload();
                              // clearInterval(interval);  for chrome users
                         }
                         // if you want to have the score go up by 2,3,4,etc.
                         // try this approach
                         /*
                         score += 2; // increase player score when brick is hit
                         if ((score / 2) == brickRowCount * brickColumnCount){
                              alert(`YOU WIN, CONGRATS! YOUR HIGH SCORE WAS ${score}`);
                              document.location.reload();
                              // clearInterval(interval);  for chrome users
                         }
                          */
                    }
               }
          }
     }
     
}
/*This function generates a random number in a range and decides upon the color from the list of colors based
on the random number. */
function getColorChoice(){
     const oldColor = color;
 
     // Returns a random integer from 1 to 10: 
     //let myRandNumber = Math.floor(Math.random() * 10) + 1;
     // without the +1 then it would start at 0.
     // changing the 10 will change the final value of the range (inclusive)
     // generate random number and use that as the index to access a color element from the colors array
     let myRandNumber = Math.floor(Math.random() * 7);
     let newColor = listOfColors[myRandNumber];

     // avoid the scenario in which the next color is the same as the current one (old one), keep rerunning until new color is picked
     while(newColor == oldColor){
          myRandNumber = Math.floor(Math.random() * 7);
          newColor = listOfColors[myRandNumber];
     }

     return newColor;
}


/*
In this function,  the circle (our ball) will be
drawn on a given position (x and y). */
function drawBall(color){
     ctx.beginPath();
     // radius - the  distance between center and boundary of the circle (the circumference)
     ctx.arc(x,y,ballRadius,0,Math.PI * 2);
     ctx.fillStyle = color;
     ctx.fill();
     ctx.closePath();
}


/* This function will draw a paddle near the bottom of the screen. */
function drawPaddle() {
     ctx.beginPath();
     ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
     ctx.fillStyle = "red";
     ctx.fill();
     ctx.closePath();
}

/*This function loops through the array of bricks and draws them to the screen. 

Each brickX position is worked out as brickWidth + brickPadding, multiplied by the column number, c, 
plus the brickOffsetLeft; the logic for the brickY is identical except that it uses the values for row number, r,
brickHeight, and brickOffsetTop. Now every single brick can be placed in its correct place row and column, with padding 
between each brick, drawn at an offset from the left and top canvas edges.

The final version of the drawBricks() function, after assigning the brickX and brickY values as the 
coordinates instead of (0,0) each time,
*/
function drawBricks(){
     for (let c = 0; c < brickColumnCount; c++){
          for (let r = 0; r < brickRowCount; r++){
               if (bricks[c][r].status == 1){
                    let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "lime";
                    ctx.fill();
                    ctx.closePath();
               }

          }
     }
}

/* This function will draw the score counter onto the canvas. */
function drawScore(){
     ctx.font = "16px Arial";
     ctx.fillStyle = "white";
     ctx.fillText(`Score:  ${score}`, 8, 20);
}
/*
This function is the main drawing loop which will do the following 
every 10 milliseconds :
the canvas is cleared,draw all game objects, activate collision detection for bricks,
and finally the x and y values of ball will be updated 
for the next frame.
*/
function draw(){
     ctx.clearRect(0,0,canvas.width,canvas.height)

     drawBricks();
     drawBall(color);
     drawPaddle();
     drawScore();
     collisionDetection();

     // display color of the ball as an html h2 (heading) element
     colorString.innerHTML = "current ball color :" + color;

     /*collision detection right and left walls. 
     When balls currrent position surpasses the RIGHT border - the balls radius (a position that is a little bit before the wall)
     then reverse the speed of the ball (forces it to go in the opposite direction).
     
     When balls currrent position surpasses the LEFT border (a position that is a little bit after the wall, equal to the ball radius)
     then reverse the speed of the ball (forces it to go in the opposite direction). */
     if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
          dx = -dx; // reverse the balls direction
          // change the color of the ball when it hits left or right  walls.
          color = getColorChoice();
     }

     /*collision detection for top wall

     When balls currrent position surpasses the balls radius (a position that is a little bit before the top wall)
     then reverse the speed of the ball (forces it to go in the opposite direction).

     instead of the ball bouncing off when HALF of it is going past the border, it will bounce off
     as soon as its CIRCUMFERENCE is touched (the circumference is the outline of the circle).
     */
     if (y + dy < ballRadius){
          dy = -dy; // reverse the balls direction
          // change the color of the ball when it hits top  wall.
          color = getColorChoice();    
     } else if (y + dy > canvas.height - ballRadius){          
          //When balls currrent position surpasses the bottom of the screen which is 
          // OLD (ignore this one) :(canvas height - ballRadius) = a position that is a little bit before the wall
          // NEW : canvas.height + paddleHeight = a position beyond the bottom wall (similar to how it works in the atari breakout)
          
          //then check whether the center of the ball is between the left and right edges of the paddle.
          if (x > paddleX && x < paddleX + paddleWidth) {
               dy = -dy;// reverse the balls direction
               // old code to speed up ball every time -> dy = -dy - 1;
               console.log("the speed is " + dy);
          }
          else{
               //  ball fell to a space that is not within the paddle so it went beyond the bottom wall.
               //then end the game and reload the webpage.
               alert("Game over!");
               document.location.reload();
               //clearInterval(interval);  this one is needed for chrome to end the game   
          }
          

     }


     //Note: Try making the ball move faster when it hits the paddle.


     // when  paddle is moving right, move their x position by number of pixels
     // when the paddle goes beyond right wall then keep its x position as the canvas width - paddleWidth
     if (rightPressed && paddleX < canvas.width - paddleWidth){
          paddleX += 7;
     }
     else if (leftPressed && paddleX > 0){
          // when paddle is moving left, move their x position by number of pixels
          // when the paddle goes beyond left wall then keep its x position at 0
          paddleX -= 7;

     }

     /* update x and y with our dx and dy variable on every frame, 
     so the ball will be painted in the new position on every update.*/
    x += dx;
    y += dy;
}

/*
This function will initialize the main game loop code.
*/
function startGame(){
     // draw func will be run within setInterval every 10 MILISECONDS.
     // setInterval func repeats any given func at every given time interval.
     let interval = setInterval(draw,10);
}

// check if user clicked on the run button which starts the game through an anonymous function.  
document.getElementById("runButton").addEventListener("click",function(){
     startGame();
     // prevent button from being clicked again by disabling it
     this.disabled = true;
     // if this is not set to true, the user can keep clicking start game which will cause the game to speed up.
})

