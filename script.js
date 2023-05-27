const root = document.querySelector("#root");
const grid = document.createElement("div");
const gridInput = setupGridInput();
const colorInput = setupColorInput();

let currentColor = colorInput.value;
let currentSize = gridInput.value;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

setupApp();

function paint(target) {
  if (mouseDown) target.style.backgroundColor = currentColor;
}

function reloadGrid(newSize) {
  grid.textContent = "";
  currentSize = newSize;
  setupGrid(currentSize);
}

function setupApp() {
  setupDocument();
  setupRoot();
  setupGrid(currentSize);

  root.appendChild(gridInput);
  root.appendChild(grid);
  root.appendChild(colorInput);
}

function setupDocument() {
  document.body.style = getDocumentStyle();
}

function setupRoot() {
  root.style = getRootStyle();
}

function setupGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const block = document.createElement("div");
    block.style = getBlockStyle();
    block.addEventListener("mouseover", event => paint(event.target));
    grid.appendChild(block);
  }
  grid.style = getGridStyle();
}

function setupGridInput() {
  const gridInput = document.createElement("input");
  gridInput.setAttribute("type", "range");
  gridInput.setAttribute("min", 0);
  gridInput.setAttribute("max", 100);
  gridInput.setAttribute("value", 16);
  gridInput.onchange = event => reloadGrid(event.target.value);
  return gridInput;
}

function setupColorInput() {
  const colorInput = document.createElement("input");
  colorInput.setAttribute("type", "color");
  colorInput.setAttribute("value", "#000000");
  colorInput.style = getColorInputStyle();
  colorInput.onchange = event => (currentColor = event.target.value);
  return colorInput;
}

function getDocumentStyle() {
  return `
    border: 0;
    margin: 0;
    background-color: #222222;
    padding: 8px;
    user-select: none;
  `;
}

function getRootStyle() {
  return `
    width: 100%;
    height: 100%;
    text-align: center;
  `;
}

function getGridStyle() {
  return `
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(${currentSize}, 1fr);
    margin: 12px auto;
  `;
}

function getBlockStyle() {
  return `
    width: 100%;
    height: 100%;
    gap: 1px;
    background-color: #ffffff;
  `;
}

function getColorInputStyle() {
  return `
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
  `;
}
