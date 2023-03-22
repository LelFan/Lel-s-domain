// Pizza guesser
// Wasi M.
// March 21st, 2023
//
// Extra for Experts:
// The entire project has an asdjustable difficulty, allowing for the entire thing to work up to 9. I also used the text() function along with several associated functions to give instructions

//setting up global variables
let toppings = ["pepperoni","olives","basil","ham"];
let cheese = ["mozarella","moldy cheese", "cheddar", "blue cheese"];
let pizzaType = ["thin","normal","square", "thin square"];
let orders = [];
let pizz = [];
let difficulty = 6;
let big = 150;
let basilSize = 0;
let answer = [];
let guess = [];
let x;
let message;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  createOrders();
  createAnswer();
  textAlign(CENTER);
  textSize(20);

  //instructing the player on which pizza they're looking for.
  message = "Which pizza has " + answer[0].type + " crust, " + answer[0].cheese +" cheese and has " + answer[0].topping +"?";
}

function draw() {
  background(220); 
  createPizza();
  //displaying instructions
  fill("black");
  text(message, width/2, height/2 + big) 
}

function createOrders() {
  for (let i=0; i <difficulty; i++) {

    //creating a set of randomized pizzas as many times as the difficulty asks for
    let pizza = {
      cheese: cheese[round(random(0,3.5))],
      topping: toppings[round(random(0,3.5))],
      type: pizzaType[round(random(0,3.5))]
    };
    orders.push(pizza);
  }
}

function createPizza(){
  //drawing all the pizzas
  for (let i=0; i <difficulty; i++) {
    if (orders[i].type === "square" || orders[i].type === "thin square") {
      fill(222, 165, 80);
      rect(width/(difficulty + 1) * (i+1), height/2,big,big);
      drawCheese(i);
      drawToppings(i);
    } 
    else {
      fill(222, 165, 80);
      ellipse(width/(difficulty + 1) * (i+1), height/2,big,big);
      drawCheese(i);
      drawToppings(i);
    }
  }
}

function drawCheese(pizza_number){
  //drawing the cheese and using it to also make the crust
  if (orders[pizza_number].cheese === "mozarella"){
    fill("white");
  }
  else if (orders[pizza_number].cheese === "blue cheese"){
    fill(173, 219, 237);
  }
  else if (orders[pizza_number].cheese === "cheddar"){ 
    fill("orange");
  }
  else {
    fill(131, 179, 102);
  }

  if (orders[pizza_number].type === "square" ){
    rect(width/(difficulty + 1) * (pizza_number+1), height/2,big-30,big-30);
  }
  else if (orders[pizza_number].type === "thin square" ){
    rect(width/(difficulty + 1) * (pizza_number+1), height/2,big-10,big-10);
  }
  else if (orders[pizza_number].type === "normal" ){
    ellipse(width/(difficulty + 1) * (pizza_number+1), height/2,big-30,big-30);
  }
  else{
    ellipse(width/(difficulty + 1) * (pizza_number+1), height/2,big-10,big-10);
  }
    
}

function drawToppings(pizza_number){
  //drawing toppings
  if (orders[pizza_number].topping === "ham") {
    fill(166, 108, 133); 
  }
  else if (orders[pizza_number].topping === "olives") {
    noFill();
    stroke(51);
    strokeWeight(4);
  }
  else if (orders[pizza_number].topping === "pepperoni") {
    fill("red");
  }
  else if (orders[pizza_number].topping === "basil") {
    fill("green");
    basilSize = 10;
  }
  ellipse(width/(difficulty + 1) * (pizza_number+1), height/2 +30, 20 - basilSize,20);
  ellipse(width/(difficulty + 1) * (pizza_number+1) +30 , height/2 -30, 20 - basilSize,20);
  ellipse(width/(difficulty + 1) * (pizza_number+1) -30 , height/2 -30, 20 - basilSize,20);
  noStroke();
  basilSize = 0;
  strokeWeight(1);
}

function mousePressed() {
  //allows user to select a pizza 
  if (mouseY >(height/2 -big/2) && mouseY <(height/2 + big/2) && mouseX < width - width/(difficulty*2) && mouseX >width/(difficulty*2)){
    let x = Math.floor(mouseX/(width/difficulty));
    if (guess.length ===0){
      guess.push(orders[x])
      checkAnswer();
    }
  }
}

function createAnswer() {
  //generates an answer based on the random pizzas
  answer.push(orders[round(random(0,difficulty + 0.5))])
} 

function checkAnswer() {
  //checks if the guessed pizza is right
  if (answer[0] === guess[0]){
    message = "Good job, refresh to play again."
  }
  else {
    message = "Better luck next time, refresh to play again."
  }
}