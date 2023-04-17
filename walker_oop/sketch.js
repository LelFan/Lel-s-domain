// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class walker {
  constructor(direction,x,y,color,size,speed){
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.speed = speed;
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.size);
  }
  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      //down
      this.y += this.speed;
    }
    else if (choice < 75) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}


let kevin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kevin = new walker(0,width/2,height/2,"red", 5,10);
}

function draw() {
  kevin.display();
  kevin.move();
}
