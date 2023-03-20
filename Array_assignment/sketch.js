// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let toppings = ["pepperoni", "mushrooms","peppers","basil","ham"];
let cheese = ["mozarella","provolone", "cheddar", "blue cheese"];
let pizzaType = ["thin crust","normal crust","square", "thin square"];
let orders = [];
let pizz = [];
let difficulty = 3;
let big = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  createOrders();
}

function draw() {
  background(220);
  createPizza();
}

function createOrders() {
  for (let i=0; i <3; i++) {

    let pizza = {
      cheese: cheese[round(random(0,4))],
      topping: toppings[round(random(0,5))],
      type: pizzaType[round(random(0,4))]
    };
    orders.push(pizza);
  }
}

function createPizza(){
  for (let i=0; i <difficulty; i++) {
    if (orders[i].type === "square" || orders[i].type === "thin square") {
      fill(222, 165, 80);
      rect(width/(difficulty + 1) * (i+1), height/2,big,big);
      
    } 
    else {
      fill(222, 165, 80);
      ellipse(width/(difficulty + 1) * (i+1), height/2,big,big);
    }
  }
}