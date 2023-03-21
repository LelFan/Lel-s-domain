// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const ROWS = 4;
const COLS = 4;
let griddy;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  griddy = createEmpty2dArray(ROWS,COLS);
  if (width < height) {
    cellSize = width/COLS;
  }
  else {
    cellSize = height/ROWS;
  }
}

function draw() {
  background(220);
  displayGrid(griddy);
}

function createEmpty2dArray(ROWS,COLS) {
  let newGrid = [];
  for (let y=0; y <ROWS; y++) {
    newGrid.push([]);
    for (let x=0; y<COLS; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function displayGrid(grid) {
  for (let y =0; y <ROWS; y++){
    for (let x =0; x <COLS; x++){
      if (grid[y][x]===0) {
        fill("orange");
      }
      else{
        fill("blue");
      }
      rect(x*cellSize,y*cellSize,cellSize,cellSize);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x,y);
  toggleCell(x+1,y);
  toggleCell(x-1,y);
  toggleCell(x,y+1);
  toggleCell(x,y-1);
}

toggleCell (x,y) {
  
}