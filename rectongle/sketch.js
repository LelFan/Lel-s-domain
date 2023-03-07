// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let boxes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBox(height/2,width/2,50,2);
}

function draw() {
  background(220);
  for (let i =0; i ,boxes.length; i++) {
    displayBox(boxes[i]);
  }
}

function displayBox(myBox) {
  push();
  translate(myBox.x,myBox.y);
  rotate(myBox.rotation);
  square(0,0,myBox.size); 
  pop();
}

function spawnBox(X,Y,Size,Rotation) {
  let someBox = {
    x:X,
    y:Y,
    size:Size,
    rotation:Rotation
  };
  boxes.push(someBox);
}
