// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let toppings = ["pepperoni","olives","basil","ham"];
let cheese = ["mozarella","moldy cheese", "cheddar", "blue cheese"];
let pizzaType = ["thin crust","normal crust","square", "thin square"];
let orders = [];
let pizz = [];
let difficulty = 3;
let big = 150;
let basilSize = 10;

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
  for (let i=0; i <difficulty; i++) {

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
      drawCheese(i);
    } 
    else {
      fill(222, 165, 80);
      ellipse(width/(difficulty + 1) * (i+1), height/2,big,big);
      drawCheese(i);
    }
  }
}

function drawCheese(pizza_number){
  if (orders[pizza_number].cheese === "mozarella"){
    fill("white")
  }
  else if (orders[pizza_number].cheese === "blue cheese"){
    fill(173, 219, 237)
  }
  else if (orders[pizza_number].cheese === "cheddar"){ 
    fill("orange")
  }
  else {
    fill(131, 179, 102)
  }

  if (orders[pizza_number].type === "square" ){
    rect(width/(difficulty + 1) * (pizza_number+1), height/2,big-30,big-30);
  }
  else if (orders[pizza_number].type === "thin square" ){
    rect(width/(difficulty + 1) * (pizza_number+1), height/2,big-10,big-10);
  }
  else if (orders[pizza_number].type === "normal crust" ){
    ellipse(width/(difficulty + 1) * (pizza_number+1), height/2,big-30,big-30);
  }
  else{
    ellipse(width/(difficulty + 1) * (pizza_number+1), height/2,big-10,big-10);
  }
    
}

function drawToppings(pizza_number){
  if (orders[pizza_number].toppings === "ham") {
    fill(166, 108, 133); 
  }
  else if (orders[pizza_number].toppings === "olive") {
    noFill();
    stroke("black");
  }
  else if (orders[pizza_number].toppings === "pepperoni") {
    fill("red")
  }
  ellipse(width/(difficulty + 1) * (pizza_number+1), height/2 +30, )
}