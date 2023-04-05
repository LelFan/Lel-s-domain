// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;

const ROWS = 20;
const COLS = 20;
let characterX;
let characterY;
let cellSize;
let level = 0;
let enemies = [];
let scraps = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createRandomGrid(ROWS, COLS);
  characterX = floor(random(6.5,14.5));
  characterY = floor(random(6.5,14.5));
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
  if (key==="u") {
    grid = levelUpdate();
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
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function createRandomGrid(ROWS, COLS) {
  let newGrid = [];
  for (let y = 0; y < ROWS; y++) {
    newGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      newGrid[y].push(0);
    }
  }
  for (let i = 0; i < level*2 + 8; i++) {
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
  // for (let i = 0; i < scraps.length; i++) {
    
  // }
  for (let i = 0; i < enemies.length; i++) {
    if (update[enemies[i].Y][enemies[i].X] === 0) {
      update[enemies[i].Y][enemies[i].X] = 1;
    }
  }
  return update;
}

// need to do: Dalek movement/turn updates, power ups (bomb, teleport and lives), new levels