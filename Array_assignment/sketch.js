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

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  createOrders();
}

function createOrders() {
  for (let i=0; i <difficulty; i++) {
    let pizza = {
      cheese: cheese[random(0,4)],
      topping: toppings[random(0,5)],
      time: pizzaType[random(0,4)]
    };
    orders.push(pizza);
  }
}

function createPizza(){
  
}