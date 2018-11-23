let grid = document.getElementById('grid');
for (let i = 0; i < 240; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}

let iShape = document.getElementById('i');
for (let i = 0; i < 4; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    iShape.appendChild(square); 
}

let oShape = document.getElementById('o');
for (let i = 0; i < 4; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    oShape.appendChild(square); 
}

let zShape = document.getElementById('z');
for (let i = 0; i < 4; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    zShape.appendChild(square); 
}

let lShape = document.getElementById('l');
for (let i = 0; i < 4; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    lShape.appendChild(square); 
}

let tShape = document.getElementById('t');
for (let i = 0; i < 4; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    tShape.appendChild(square); 
}