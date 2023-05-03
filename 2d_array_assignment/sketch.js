// Daleks
// Wasi M.
// April 17th 2023
//
// Extra for Experts:
// I created the levelUpdate function that tackles a lot of different game logic.


//setting up
let grid;
const ROWS = 20;
const COLS = 20;
let characterX;
let characterY;
let cellSize;
let level = 1;
let enemies = [];
let scraps = [];
let bombs = 2;
let teleports = 2;
let highscore = 1;



function preload() {
  enemyImg = loadImage("turret.png");
  playerImg = loadImage("player.png");
  fireImg = loadImage("fire.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandomGrid(ROWS, COLS); //creating first level
  grid[characterY][characterX] = 9; //spawing player

  //determining cell size for grid
  if (width < height) {
    cellSize = width/ROWS;
  }
  else {
    cellSize = height/ROWS;
  }
  textAlign(CENTER); //later set up
}

function draw() {
  if (enemies.length=== 0) {
    newLevel(); //level completetion check
  }
  background(255);
  displayGrid();
  fill("black");
  instructionsAndCounts(); //text for intructions and showing different stats
}

function keyTyped() {
  //number keys are used for directional movement
  if (key==="2") {
    moveCharacter(0,1);
  }
  if (key==="8") {
    moveCharacter(0,-1);
  }
  if (key==="6") {
    moveCharacter(1,0);
  }
  if (key==="4") {
    moveCharacter(-1,0);
  }
  if (key==="7") {
    moveCharacter(-1,-1);
  }
  if (key==="9") {
    moveCharacter(1,-1);
  }
  if (key==="1") {
    moveCharacter(-1,1);
  }
  if (key==="3") {
    moveCharacter(1,1);
  }
  if (key==="z") { //using teleport
    if (teleports > 0){
      grid[characterY][characterX] = 0;
      teleport();
      teleports--;
    }
  }
  if (key==="x") { //using bomb
    bomb();
  }
}


function moveCharacter(x,y) { //changes player location according to key pressed
  if (characterX + x >= 0 && characterX + x < COLS && characterY + y >=0 && characterY + y < ROWS){
    let tempX = characterX;
    let tempY = characterY;

    characterX += x;
    characterY +=y;

    grid[characterY][characterX] = 9;
    grid[tempY][tempX] =0;
  }
  levelUpdate(); //updates enemies and other things after player moves
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 1) {
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        image(enemyImg, x * cellSize, y * cellSize, cellSize, cellSize); //drawing enemy
      }
      else if (grid[y][x] === 0) {
        fill("white");
        rect(x * cellSize, y * cellSize, cellSize, cellSize); //drawing open space
      }
      else if(grid[y][x]===9) {      
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        image(playerImg, x * cellSize, y * cellSize, cellSize, cellSize); //drawing player
      }
      else if (grid[y][x]===2) {
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        image(fireImg, x * cellSize, y * cellSize, cellSize, cellSize); //drawing fire
      }
    }
  }
}

function createRandomGrid(ROWS, COLS) {
  characterX = floor(random(6.5,14.5));
  characterY = floor(random(6.5,14.5));
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(0);
    }
  }
  for (let i = 0; i < level*2 + 6; i++) {
    let enemyTempX = floor(random(0,20));
    let enemyTempY = floor(random(0,20));
    let enemy = {
      X: enemyTempX,
      Y: enemyTempY
    };
    enemies.push(enemy);
    newGrid[enemyTempY][enemyTempX] = 1;
  }
  return newGrid;
}

function createEmptyGrid(ROWS, COLS) { //creates empty grid for level updates
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function levelUpdate() {
  let update = createEmptyGrid(ROWS,COLS);
  let newEnemies = []; //list used for new enemy positions
  for (let i = 0; i < enemies.length; i++) {
    let enemyTempX = 0;
    let enemyTempY = 0;
    if (characterX < enemies[i].X) {
      enemyTempX = enemies[i].X - 1;
    }
    else if (characterX > enemies[i].X) {
      enemyTempX = enemies[i].X + 1;
    }
    else{
      enemyTempX = enemies[i].X;
    }
    if (characterY < enemies[i].Y) {
      enemyTempY = enemies[i].Y - 1;
    }
    else if (characterY > enemies[i].Y) {
      enemyTempY = enemies[i].Y + 1;
    }
    else{
      enemyTempY = enemies[i].Y;
    }
    let newEnemy = {
      X:enemyTempX,
      Y:enemyTempY
    };
    newEnemies.push(newEnemy);
  }
  enemies = [...newEnemies];
  //all logic above is enemy movement according to player position
  for (let i = 0; i < scraps.length; i++) {
    update[scraps[i].Y][scraps[i].X] = 2; //creating "scraps", which ended up being fire due to lack of desirable png
  }
  for (let i = 0; i < enemies.length; i++) {
    if (update[enemies[i].Y][enemies[i].X] === 0) {
      update[enemies[i].Y][enemies[i].X] = 1; //logic for moving enemy to an empty spot
    }
    else if (update[enemies[i].Y][enemies[i].X] === 1) {
      update[enemies[i].Y][enemies[i].X] = 2;
      let scrap = {
        X: enemies[i].X,
        Y: enemies[i].Y
      };
      scraps.push(scrap); //creating "scrap" at enemy collison
      let tempEnemies = [];
      for (let j = 0; j < enemies.length; j++) {
        if (enemies[j].X !== enemies[i].X || enemies[j].Y !== enemies[i].Y) {
          tempEnemies.push(enemies[j]); //deleting enemies that collided
        }  
      }
      enemies = tempEnemies; //saving new enemy list
    }
    else if (update[enemies[i].Y][enemies[i].X] === 2) {
      enemies.splice(i,1); //logic for enemy hitting "scrap"
    }
  }
  for (let enemy of enemies) {
    update[enemy.Y][enemy.X] = 1; //bs check
  }
  if (update[characterY][characterX]=== 1 || update[characterY][characterX]=== 2){
    update = gameOver(); //game over if player hits enemy or "scrap"
  }
  update[characterY][characterX] = 9;
  grid = update; 
}

function bomb() {
  if (bombs > 0) {
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let enemyInList = 0; enemyInList < enemies.length; enemyInList++) {
          if (enemies[enemyInList].X ===characterX + x && enemies[enemyInList].Y === characterY + y){ // checks if enemy is in any adjacent square to the player
            let scrap = {
              X: enemies[enemyInList].X,
              Y: enemies[enemyInList].Y
            };
            scraps.push(scrap);
            enemies.splice(enemyInList,1); //destroys enemies that are adjacent 
          }
        }
      }
    }
    bombs--; //takes away a bomb from the player
    levelUpdate(); 
  }
}

function teleport() {
  characterX = floor(random(0.5,20.5));
  characterY = floor(random(0.5,20.5));
  if (grid[characterY][characterX]=== 1 ||grid[characterY][characterX]=== 2){
    teleport(); // if player teleports to a "scrap" or enemy reruns the randomizer
  }
  grid[characterY][characterX] = 9;
}

function gameOver() { //resets variables and grid when player loses
  scraps = [];
  enemies = []; 
  bombs = 2;
  teleports = 2;
  level = 1; 
  grid = createRandomGrid(ROWS, COLS)
  return grid;
}

function instructionsAndCounts() { //text for instructions and other variables
  textSize(40);
  text("Daleks", height*1.5, height*0.2);
  textSize(20);
  text("Use Number pad to move. Use z for teleport and x for bomb.", height*1.5, height*0.3);
  text("Destroy Daleks by making them run into each other or use the bomb.", height*1.5, height*0.33);
  text("Don't run into the Daleks or the scrap and survive the onslaught.", height*1.5, height*0.36);
  text("bomb count: " + bombs +"      teleports: " + teleports, height*1.5, height*0.45);
  text("level: " + level + "                highscore: " + highscore, height*1.5, height*0.5);

}

function newLevel(){ //creates a new level and resets certain variables
  scraps = [];
  bombs = 2;
  teleports = 2;
  level++;
  grid = createRandomGrid(ROWS, COLS);
  grid[characterY][characterX] = 9;
  if (level > highscore){
    highscore++; //updates highscore
  }
}
