let grid = document.getElementById('grid');
for (let i = 0; i < 240; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}

let tetrominoShapes = Array.from(document.getElementById('tetrominoes').children);
for (let shape of tetrominoShapes) {
    for (let i = 0; i < 4; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        shape.appendChild(square);
    }
}
