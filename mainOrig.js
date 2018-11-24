playGame();

function playGame() {
    drawGrid();
    let tetrominoes = createShapes();
    descendShape(tetrominoes, () => descendShape(tetrominoes, () => descendShape(tetrominoes, () => descendShape(tetrominoes))));
}

function drawGrid() {
    let grid = document.getElementById('grid');
    for (let i = 0; i < 240; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }
}

function createShapes() {
    let shapeNames = ['i', 'o', 'z', 't', 'l'];

    let tetrominoes = shapeNames.map(name => {
        let shape = document.createElement('div');
        shape.classList.add('shape');
        shape.classList.add(name);
        for (let i = 0; i < 4; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            shape.appendChild(square);
        }
        return shape;
    });

    return tetrominoes;
}

function descendShape(arrayOfShapes, callback) {
    let shape = getRandomShape(arrayOfShapes);

    shape.style.position = 'absolute';
    shape.style.top = '0px';
    if (shape.id === 'i') {
        shape.style.left = '80px';
    } else {
        shape.style.left = '100px';
    }
    
    document.getElementById('grid').appendChild(shape);
    floatDown(shape, callback);
}

function getRandomShape(arrayOfShapes) {
    return arrayOfShapes[Math.floor(Math.random() * 5)];
}

function floatDown(shape, callback) {
    let floatDownInterval = window.setInterval(drop, 100);
    let height = Number(shape.style.top.substring(0, -2));

    function drop() {
        height += 20;
        if (shape.id === 'i' && height <= 380) {
            shape.style.top = height + 'px';
        } else if (shape.id !== 'i' && height <= 360) {
            shape.style.top = height + 'px';
        } else {
            clearInterval(floatDownInterval);
            callback();
        }
    }
}    
