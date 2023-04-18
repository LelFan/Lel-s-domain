// Daleks
// Wasi M.
// April 17th 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandomGrid(ROWS, COLS);
  grid[characterY][characterX] = 9;

  if (width < height) {
    cellSize = width/ROWS;
  }
  else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid();
  if (enemies.length=== 0) {
    scraps = [];
    bombs = 2;
    teleports = 2;
    level++;
    grid = createRandomGrid(ROWS, COLS);
    grid[characterY][characterX] = 9;
  }
}

function keyTyped() {
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
  if (key==="z") {
    if (teleports > 0){
      grid[characterY][characterX] = 0;
      teleport();
    }
  }
  if (key==="x") {
    bomb();
  }
}


function moveCharacter(x,y) {
  if (characterX + x >= 0 && characterX + x < COLS && characterY + y >=0 && characterY + y < ROWS){
    let tempX = characterX;
    let tempY = characterY;

    characterX += x;
    characterY +=y;

    grid[characterY][characterX] = 9;
    grid[tempY][tempX] =0;
  }
  levelUpdate();
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 0) {
        fill("white");
      }
      else if(grid[y][x]===9) {
        fill("red");
      }
      else if (grid[y][x]===2) {
        fill("brown");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
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

function createEmptyGrid(ROWS, COLS) {
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
  let newEnemies = [];
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
  for (let i = 0; i < scraps.length; i++) {
    update[scraps[i].Y][scraps[i].X] = 2;
  }
  for (let i = 0; i < enemies.length; i++) {
    if (update[enemies[i].Y][enemies[i].X] === 0) {
      update[enemies[i].Y][enemies[i].X] = 1;
    }
    else if (update[enemies[i].Y][enemies[i].X] === 1) {
      update[enemies[i].Y][enemies[i].X] = 2;
      let scrap = {
        X: enemies[i].X,
        Y: enemies[i].Y
      };
      scraps.push(scrap);
      let tempEnemies = [];
      for (let j = 0; j < enemies.length; j++) {
        if (enemies[j].X !== enemies[i].X || enemies[j].Y !== enemies[i].Y) {
          tempEnemies.push(enemies[j]);
        }  
      }
      enemies = tempEnemies;
    }
    else if (update[enemies[i].Y][enemies[i].X] === 2) {
      enemies.splice(i,1);
    }
  }
  for (let enemy of enemies) {
    update[enemy.Y][enemy.X] = 1;
  }
  if (grid[characterY][characterX]=== 1 ||grid[characterY][characterX]=== 2){
    
  }
  update[characterY][characterX] = 9;
  grid = update;
}

function bomb() {
  if (bombs > 0) {
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let enemyInList = 0; enemyInList < enemies.length; enemyInList++) {
          if (enemies[enemyInList].X ===characterX + x && enemies[enemyInList].Y === characterY + y){
            let scrap = {
              X: enemies[enemyInList].X,
              Y: enemies[enemyInList].Y
            };
            scraps.push(scrap);
            enemies.splice(enemyInList,1);
          }
        }
      }
    }
    bombs--;
    levelUpdate();
  }
}

function teleport() {
  characterX = floor(random(0.5,20.5));
  characterY = floor(random(0.5,20.5));
  if (grid[characterY][characterX]=== 1 ||grid[characterY][characterX]=== 2){
    teleport();
  }

  grid[characterY][characterX] = 9;
  teleports--;
}

//new levels