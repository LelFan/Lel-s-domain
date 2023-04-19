// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
class Ball {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.color = [random(255), random(255), random(255)];
    this.alpha = random(10,255); 
    this.size = random(100);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x - this.size/2 <=0 || this.x + this.size/2 >=width) {
      this.dx *= -1;
    }
    if (this.y - this.size/2 <=0 || this.y + this.size/2 >=height) {
      this.dy *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.color,this.alpha);
    circle(this.x,this.y,this.size);
  }
  collisionCheck(otherBall) {
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    let radiiSum = this.size + otherBall.size;

    if (distanceApart < radiiSum) {
      let tempX = this.dx;
      let tempY = this.dy;
      this.dx = otherBall.
      this.dy = 
    }
  }
}

let ballArray= [];
function mouseClicked() {
  let theBall = new Ball(mouseX,mouseY);
  ballArray.push(theBall);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for (let someball of ballArray){
    someball.move();
    someball.display();
  }
}
