// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let johnsongriddy = [[]];

const ROWS = 4;
const COLS = 4;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width/ROWS;
  }
  else {
    cellSize = height/ROWS;
  }
  createRandomGrid(ROWS,COLS);
}

function draw() {
  background(220);
  displayDaGriddy();
}

function displayDaGriddy() {
  for (let y =0; y<ROWS; y++) {
    for (let x =0; x<COLS; x++){
      if (johnsongriddy[y][x] === 1) {
        fill ("black");
      }
      else if (johnsongriddy[y][x] ===0) {
        fill ("white");
      }
      rect(cellSize*x,cellSize*y,cellSize,cellSize);
    }

  }
}

function createRandomGrid(Bruh,GRIDS) {
  let newGrid = []; 
  for (let y=0; y <Bruh; y++){
    newGrid.push([]);
    for (let x =0; x <GRIDS; x++){
      if (random(100)<50) {
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
}
