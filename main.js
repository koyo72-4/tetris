let grid = document.getElementById('grid');
for (let i = 0; i < 240; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}

let shapeIds = ['i', 'o', 'z', 't', 'l'];

let tetrominoes = shapeIds.map(id => {
    let shape = document.createElement('div');
    shape.classList.add('shape');
    shape.id = id;
    for (let i = 0; i < 4; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        shape.appendChild(square);
    }
    return shape;
});

function getRandomShape() {
    let shape = tetrominoes[Math.floor(Math.random() * 5)];
    return shape;
}

let shape = getRandomShape();
shape.style.position = 'absolute';
shape.style.top = '0px';
shape.style.left = '0px';
grid.appendChild(shape);

