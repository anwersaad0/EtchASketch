const defaultSize = 28;
var divGrid = new Array(defaultSize * defaultSize);

const uiDiv = document.querySelector('div.ui');
const mainDiv = document.querySelector('div.container');

mainDiv.style.gridTemplateColumns = `repeat(${defaultSize}, 1fr)`;
mainDiv.style.gridTemplateRows = `repeat(${defaultSize}, 1fr)`;

const resetBtn = document.createElement('button');
resetBtn.textContent = "Reset";

const sizeNumber = document.createElement('p');
sizeNumber.className = 'size';
const sizeSlider = document.querySelector('input.slider');
sizeNumber.textContent = 'Size: ' + sizeSlider.value + ' x ' + sizeSlider.value;

const colorInput = document.querySelector('input.colorinput');
let selectedColor = colorInput.value;

const eraser = document.querySelector('input.eraser');
const randomColor = document.querySelector('input.random');

function createGrid() {
    for (let i = 0; i < divGrid.length; i++) {
        divGrid[i] = document.createElement('div');
        divGrid[i].className = 'unit';
    
        divGrid[i].onmouseover = function() {
            if (randomColor.checked == true) {
                this.style.backgroundColor = 
                `rgb( ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`;
            } else {
                this.style.backgroundColor = selectedColor;
            }
        };
    
        mainDiv.appendChild(divGrid[i]);
    }
}

function resetCanvas() {
    var units = document.getElementsByClassName('unit');
    var len = units.length;
    for (let i = 0; i < len; i++) {
        units[i].style.backgroundColor = '';
    }
}

colorInput.addEventListener('input', function() {
    selectedColor = this.value;
    eraser.checked = false;
    randomColor.checked = false;
});

eraser.addEventListener('input', function() {
    randomColor.checked = false;
    if (this.checked == true) {
        selectedColor = '';
    } else {
        selectedColor = colorInput.value;
    }
});

randomColor.addEventListener('input', function() {
    eraser.checked = false;
    if (this.checked == false) {
        selectedColor = colorInput.value;
    }
});

sizeSlider.addEventListener('input', function() {
    resetCanvas();
    divGrid = new Array(this.value * this.value);
    mainDiv.style.gridTemplateColumns = `repeat(${this.value}, 1fr)`;
    mainDiv.style.gridTemplateRows = `repeat(${this.value}, 1fr)`;
    createGrid(divGrid);
    sizeNumber.textContent = 'Size: ' + this.value + ' x ' + this.value;
});

resetBtn.addEventListener('click', function(e) {
    resetCanvas();
});

createGrid();

uiDiv.appendChild(sizeNumber);
uiDiv.appendChild(resetBtn);