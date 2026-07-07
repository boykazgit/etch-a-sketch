const mainContainer = document.querySelector('.main-container')
const mainContainerSize = 450;
const clearButton = document.querySelector('.clear-button');
const erazeButton = document.querySelector('.eraze-button')
const changeGridDimensionButton = document.querySelector('.change-grid-size');
const buttonsContainer = document.querySelector('.buttons-container');

//set default gridDimension which can be changed by user
let defaultGridDimension = 10;
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
     squares.style.height = `${(mainContainerSize/gridDimension)-(`${((gridDimension-1)*1)/gridDimension}`)}px`;
     squares.style.width = `${(mainContainerSize/gridDimension)-(`${((gridDimension-1)*1)/gridDimension}`)}px`;
    }
}

  const allSquares = document.querySelectorAll('.squares');

  //set id for each cell to be used for the darkening effect
  let i = 0;
    allSquares.forEach(element => {
      element.id = `square_${i}`
      i++;
    });
  }

function paint(event) {
  //Normal Paint Mode
  if (paintMode === 1) {
    if (event.target.className != 'main-container'){
      event.target.style.backgroundColor = 'darkgrey';
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
      if (event.target.className != 'main-container'){
        const allSquares = document.querySelectorAll('.squares');
        let eventId = event.target.id;
        window[eventId + '_DarkeningPercentage']
        // console.log(eventId);
        console.log(window[eventId + '_DarkeningPercentage']);
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
  }else if (event.target.className === 'rainbow-mode') {
    paintMode = 2;
  }else if (event.target.className === 'eraze-button'){
    paintMode = 3;
  } else if (event.target.className === 'darkening-mode') {
    paintMode = 4;
  }
}

mainContainer.addEventListener("mousedown", ()=> {
  allowPaint()
  }
);

window.addEventListener("mouseup", () => {
  mainContainer.removeEventListener('mouseover', paint);
});

buttonsContainer.addEventListener('click', setPaintMode);

generateGrid(defaultGridDimension);
changeGridDimensionButton.onclick =  changeGridDimension;

clearButton.addEventListener('click',clearPaint);

