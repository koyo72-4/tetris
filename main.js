class Game {
    constructor() {
        this.board = this.initializeBoard();
        this.currentShape = new Shape(idIterator.next().value);
    }

    initializeBoard() {
        let board = [];
        for (let i = 1; i <= 240; i++) {
            board.push(i);
        }
        return board;
    }

    drawBoard() {
        let grid = document.getElementById('grid');
        for (let i = 1; i <= 240; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            grid.appendChild(square);
        }
    }

    updateBoard(occupiedSquares) {
        let [ first, second, third, fourth ] = occupiedSquares;
        this.board[first - 1] = 'occupied';
        this.board[second - 1] = 'occupied';
        this.board[third - 1] = 'occupied';
        this.board[fourth - 1] = 'occupied';
    }

    play() {
        let shape = this.currentShape.shape;
        this.currentShape.position();
        drop = drop.bind(this);
        const floatDownInterval = window.setInterval(() => drop(shape), 7000);
        let height = Number(shape.style.top.substring(0, -2));
    
        function drop(shape) {
            height += 20;
            let classes = this.currentShape.classes;
            if (classes.includes('i') && height <= (bottom + 20)) {
                shape.style.top = height + 'px';
            } else if (!classes.includes('i') && height <= bottom) {
                shape.style.top = height + 'px';
            } else {
                clearInterval(floatDownInterval);
                this.currentShape.updateState("fixed");
                this.updateBoard(this.currentShape.calculatePosition());
            }
            if (this.currentShape.state === "fixed") {
                if (classes.includes('i')) {
                    bottom -= 20;
                } else {
                    bottom -= 40;
                }
                this.getNewShape();
                this.play();
            }
        }
    }

    getNewShape() {
        this.currentShape = new Shape(idIterator.next().value);
    }
}

class Shape {
    constructor(id) {
        this.id = id;
        this.possibleShapes = this.createShapes(this.id);
        this.shape = this.getRandomShape(this.possibleShapes);
        this.classes = Array.from(this.shape.classList);
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

    position() {
        this.shape.style.position = 'absolute';
        this.shape.style.top = '0px';
        if (this.classes.includes('i')) {
            this.shape.style.left = '80px';
        } else {
            this.shape.style.left = '100px';
        }
        document.getElementById('grid').appendChild(this.shape);
    }

    updateState(state) {
        this.state = state === "moving" ? "moving" : "fixed";
    }

    calculatePosition() {
        let pixelsFromTop = Number(this.shape.style.top.substring(0, -2));
        // let pixelsFromLeft = Number(this.shape.style.left.substring(0, -2));
        let squaresFromTop = pixelsFromTop / 20;
        // let squaresFromLeft = pixelsFromLeft / 20;
        let occupiedSquares;
        if (this.classes.includes('i')) {
            occupiedSquares = [233, 234, 235, 236];
        } else if (this.classes.includes('o')) {
            occupiedSquares = [222, 223, 234, 235];
        } else if (this.classes.includes('z')) {
            occupiedSquares = [222, 223, 235, 236];
        } else if (this.classes.includes('t')) {
            occupiedSquares = [222, 223, 224, 235];
        } else if (this.classes.includes('l')) {
            occupiedSquares = [222, 223, 224, 234];
        }
        return occupiedSquares;
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

let game = new Game();
game.drawBoard();
game.play();
