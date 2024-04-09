/*
Here we're storing a reference to the <canvas> element to the canvas variable. Then we're creating the ctx
     variable to store the 2D rendering context — the actual tool we can use to paint on the Canvas.
*/
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// filled rectangle
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "orange";
ctx.fill();
ctx.closePath();

// circle
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = "pink";
ctx.fill();
ctx.closePath();

// empty rectangle (stroke colors the outside of the shape only)
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgb(0 0 255 / 50%)";
ctx.stroke();
ctx.closePath();