class Game {
    constructor() {
        this.board = this.initializeBoard();
        this.currentShape = new Shape(idIterator.next().value);
    }

    initializeBoard() {
        let board = [];
        for (let i = 0; i < 240; i++) {
            board.push(null);
        }
        return board;
    }

    drawBoard() {
        let grid = document.getElementById('grid');
        for (let i = 0; i < 240; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            grid.appendChild(square);
        }
    }

    updateBoard() {
        let shape = this.currentShape.shape;
        this.positionShape(shape);
        drop = drop.bind(this);
        const floatDownInterval = window.setInterval(() => drop(shape), 70);
        let height = Number(shape.style.top.substring(0, -2));
    
        function drop(shape) {
            height += 20;
            let classes = Array.from(shape.classList);
            if (classes.includes('i') && height <= (bottom + 20)) {
                shape.style.top = height + 'px';
            } else if (!classes.includes('i') && height <= bottom) {
                shape.style.top = height + 'px';
            } else {
                clearInterval(floatDownInterval);
                this.currentShape.updateState("fixed");
            }
            if (this.currentShape.state === "fixed") {
                if (classes.includes('i')) {
                    bottom -= 20;
                } else {
                    bottom -= 40;
                }
                this.getNewShape();
                this.updateBoard();
            }
        }
    }

    getNewShape() {
        this.currentShape = new Shape(idIterator.next().value);
    }

    positionShape(shape) {
        shape.style.position = 'absolute';
        shape.style.top = '0px';
        const classes = Array.from(shape.classList);
        if (classes.includes('i')) {
            shape.style.left = '80px';
        } else {
            shape.style.left = '100px';
        }
        document.getElementById('grid').appendChild(shape);
    }
}

class Shape {
    constructor(id) {
        this.id = id;
        this.possibleShapes = this.createShapes(this.id);
        this.shape = this.getRandomShape(this.possibleShapes);
        this.state = "moving";
    }

    createShapes(id) {
        let shapeNames = ['i', 'o', 'z', 't', 'l'];
    
        let tetrominoes = shapeNames.map(name => {
            let shape = document.createElement('div');
            shape.classList.add('shape');
            shape.classList.add(name);
            shape.id = name + id;
            for (let i = 0; i < 4; i++) {
                let square = document.createElement('div');
                square.classList.add('square');
                shape.appendChild(square);
            }
            return shape;
        });
    
        return tetrominoes;
    }

    getRandomShape(possibleShapes) {
        return possibleShapes[Math.floor(Math.random() * 5)];
    }

    updateState(state) {
        this.state = state === "moving" ? "moving" : "fixed";
    }
}

function* IdGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}


const idIterator = IdGenerator();
let bottom = 360;

let g = new Game();
g.initializeBoard();
g.drawBoard();
g.updateBoard();
