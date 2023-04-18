// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sparks = [];

class Spark {
  constructor(x,y,dx,dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.size = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.size);
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

let ethan = new Spark(300,300,5,-2,"red");

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let i =0; i <sparks.length; i++) {
    sparks[i].update();
    sparks[i].display();
  }
}
function spawnSpark() {
  let theSpark = new Spark(mouseX,mouseY,random(-5,5),random(-5,5),"red");
  sparks.push(theSpark);
}

function mousePressed() {
  for (let i = 0; i < 5; i++){
    spawnSpark();
  }
}