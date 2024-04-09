/*
Here we're storing a reference to the <canvas> element to the canvas variable. 
Then we're creating the ctx variable to store the 
2D rendering context — the actual tool we can use to paint on the Canvas.
*/
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// non hard-coded STARTING position of the ball will be determined by x and y vals
let x = canvas.width / 2;
let y = canvas.height - 30;
/*
add a small value to x and y after every frame has been drawn to make it 
appear that the ball is moving. Let's define these small values 
as dx and dy and set their values to 2 and -2 respectively.
*/
let dx = 2;
let dy = -2;

/*
In this function,  the circle (our ball) will be
drawn on a given position (x and y). */
function drawBall(){
     ctx.beginPath();
     ctx.arc(x, y, 10, 0, Math.PI * 2);
     ctx.fillStyle = "blue";
     ctx.fill();
     ctx.closePath();
}

/*
This function is the main drawing loop which will do the following 
every 10 milliseconds :
the canvas is cleared, ball is drawn, and the x and y values will be updated 
for the next frame.
*/
function draw(){
     ctx.clearRect(0,0,canvas.width,canvas.height);
     drawBall();
     /* update x and y with our dx and dy variable on every frame, 
     so the ball will be painted in the new position on every update.*/
    x += dx;
    y += dy;
}

// draw func will be run within setInterval every 10 MILISECONDS.
// setInterval func repeats any given func at every given time interval.
setInterval(draw, 10);


// filled rectangle
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "orange";
ctx.fill();
ctx.closePath();

// circle
ctx.beginPath();
ctx.arc(240, 160, 40, 0, Math.PI * 2, false);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

// empty rectangle (stroke colors the outside of the shape only)
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgb(0 0 255 / 50%)";
ctx.stroke();
ctx.closePath();