const mainContainer = document.querySelector('.main-container')
const mainContainerSize = 500;
const clearButton = document.querySelector('.clear-button');
const erazeButton = document.querySelector('.eraze-button')
const changeGridDimensionButton = document.querySelector('.change-grid-size');
const buttonsContainer = document.querySelector('.buttons-container');
const paintModeDisplay = document.querySelector('.paint-status');

//set default gridDimension which can be changed by user
let defaultGridDimension = 16;
let squares;
//Set default paintMode to normal mode and changes on button press
let paintMode = 1;
// //darkening percentage for darkening paint mode
// let darkeningPercentage = 0;


function generateRandomColor() {
  const red = Math.floor(Math.random() * 256); ;
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() *256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function generateGrid(gridDimension) {
  for (let i = 0; i < gridDimension * gridDimension; i++) {
    squares = document.createElement("div");
    mainContainer.appendChild(squares);
    squares.classList.add('squares');
    squares.style.backgroundColor = 'white';
  
    if (gridDimension >= 2) {
     squares.style.height = `${(mainContainerSize/gridDimension)}px`;
     squares.style.width = `${(mainContainerSize/gridDimension)}px`;
    }
  }
}

function paint(event) {
  //Normal Paint Mode
  if (paintMode === 1) {
    if (event.target.className != 'main-container'){
      event.target.style.backgroundColor = '#3D3D3D';
    }
  //Rainbow Paint Mode
  }else if (paintMode === 2) {
    if (event.target.className != 'main-container'){
      event.target.style.backgroundColor = generateRandomColor();
    }
  //Eraze Paint Mode
  }else if (paintMode === 3) {
    if(event.target.className != 'main-container') {
      event.target.style.backgroundColor = 'white';
    }
  //Darkening Paint Mode  
  }else if (paintMode === 4) {
      const allSquares = document.querySelectorAll('.squares');
      if (event.target.className != 'main-container'){
      // get the current color 
      let currentColor = window.getComputedStyle(event.target).backgroundColor;
      // extract only the color values from the array
      let colorValueArray = currentColor.match(/\d+/g);
      // get only one entry
      let colorValue = parseInt(colorValueArray);
      //increment the color by 51 untill 255
      let newColor = Math.max(colorValue - 51, 0);
      // assign the new color
      let newColorRGB = `rgb(${newColor}, ${newColor}, ${newColor})`;
      event.target.style.backgroundColor = newColorRGB;
    }
  }
}

function allowPaint() {
  mainContainer.addEventListener('mouseover', paint);
}

function changeGridDimension() {
  gridDimension = prompt('Enter sqaures per each side (max 100):');
  while(mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
  generateGrid(gridDimension);
}

function clearPaint() {
  const allSquares = document.querySelectorAll('.squares');
  allSquares.forEach(element => {
    element.style.backgroundColor = 'white';
  });
}

function setPaintMode(event) {
  if(event.target.className === 'normal-mode') {
    paintMode = 1;
    paintModeDisplay.textContent = 'Normal Paint Mode'
  }else if (event.target.className === 'rainbow-mode') {
    paintMode = 2;
    paintModeDisplay.textContent = 'Rainbow Paint Mode'
  }else if (event.target.className === 'eraze-button'){
    paintMode = 3;
    paintModeDisplay.textContent = 'Eraze Mode'
  } else if (event.target.className === 'darkening-mode') {
    paintMode = 4;
    paintModeDisplay.textContent = 'Darkening Mode';
  }
}


mainContainer.addEventListener("mousedown", (event)=> {
  paint(event);
  allowPaint();
  }
);

window.addEventListener("mouseup", () => {
  mainContainer.removeEventListener('mouseover', paint);
});

buttonsContainer.addEventListener('click', setPaintMode);

generateGrid(defaultGridDimension);
changeGridDimensionButton.onclick =  changeGridDimension;

clearButton.addEventListener('click',clearPaint);

