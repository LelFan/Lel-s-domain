// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let toppings = ["pepperoni", "mushrooms","peppers","basil","ham"];
let cheese = ["mozarella","provolone", "cheddar", "parmesan"];
let bakeTime = [10,12,15,20];
let orders = []
let pizz = []

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  createOrder();
}

createOrder() {
  let pizza = {
    cheese: cheese[random(0,4)],
    topping: toppings[random(0,5)],
    time: bakeTime[random(0,4)]
  }
  orders.push(pizza)
}