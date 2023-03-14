// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time = 0;
let terrain = [];
let xOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangles();
}

function draw() {
  background(255);
  // let x = noise(time)*width;
  // let y = noise(time + 1)*height;
  // fill("red");
  // circle(x, y, 50);
  // time += 0.1;
  if (keyIsDown(RIGHT_ARROW)) {
    xOffset += 5;
  }

  if (keyIsDown(LEFT_ARROW)) {
    xOffset -= 5;
  }

  for (let i=xOffset; i<xOffset+width; i++) {
    rect(terrain[i].x -xOffset, height-terrain[i].height,1,terrain[i].height);
  }
}

function spawnRectangles() {
  let time = 0;
  for (let x=0; x<10000; x++) {
    let h = noise(time)*height;
    let thisRect = {
      x: x,
      height: h,
    }
    terrain.push(thisRect);
    time +=0.005;
  }
}