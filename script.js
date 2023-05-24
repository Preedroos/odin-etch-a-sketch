const blankColor = "#ffffff";
let currentColor = "#256776";
let currentSize = 16;

const root = document.querySelector("#root");
const grid = document.createElement("div");

document.body.style = getBodyStyle();
root.style = getRootStyle();

setupGrid();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function paint(target) {
  if (mouseDown) target.style.backgroundColor = currentColor;
}

function reloadGrid() {
  clearGrid();
  loadGrid();
}

function clearGrid() {
  grid.textContent = "";
}

function loadGrid() {
  for (let i = 0; i < currentSize * currentSize; i++) {
    const block = document.createElement("div");
    block.style = getBlockStyle();
    block.addEventListener("mouseover", event => paint(event.target));
    grid.appendChild(block);
  }
}

function setupGrid() {
  loadGrid();
  grid.style = getGridStyle();
  root.appendChild(grid);
}

function getBodyStyle() {
  return `
    background-color: #222222
  `;
}

function getRootStyle() {
  return `
    display: flex; 
    flex-direction: column; 
    align-items: center
  `;
}

function getGridStyle() {
  return `
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(${currentSize}, 1fr)
  `;
}

function getBlockStyle() {
  return `
    width: 100%;
    height: 100%;
    background-color: ${blankColor};
  `;
}
