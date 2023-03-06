// Generative art
// Mar 3, 2023

function setup() {
  createCanvas(windowWidth, windowHeight);
  art(8);
}

function draw() {
}

function diagonal_line(x,y,spacing) {
  if (random(100)>50){
    line(x-spacing/2,y+spacing/2,x+spacing, y-spacing/2);
  }
  else {
    line(x+spacing/2,y-spacing/2,x-spacing, y+spacing/2); 
  }
}

function art(size) {
  for (let x = height/(size*2); x < height; x += windowHeight/size){
    for (let y = width/(size*2); y < width; y += windowWidth/size) {
      diagonal_line(x,y,windowWidth/size);
    }
  }
}

