// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball(width/2,height/2);
}

function draw() {
  background(255);
  moveShapes();
  displayShapes();
}

function ball(tempX,tempY) {
  let newball = {
    x: tempX,
    y: tempY,
    dx: random(-5,5),
    dy: random(-5,5),
    diameter: random(25,100),
    theColor: color(random(255),random(255),random(255))
  };
  shapes.push(newball);
}

function moveShapes() {
  for (let i=0; i<shapes.length; i++) {
    if (shapes[i].x < 0 || shapes[i].x > width) {
      shapes[i].dx = shapes[i].dx * -1;
    }
    if (shapes[i].y < 0 || shapes[i].y > height) {
      shapes[i].dy = shapes[i].dy * -1;
    }


    shapes[i].x += shapes[i].dx;
    shapes[i].y += shapes[i].dy;
  }
}

function displayShapes() {
  for (let i=0; i<shapes.length; i++) {
    noStroke();
    fill(shapes[i].theColor);
    circle(shapes[i].x,shapes[i].y,shapes[i].diameter);
  }
}

function mousePressed() {
  ball(mouseX,mouseY);
}