class Game {
    constructor() {
        this.board = new Board();
        this.board = this.initializeBoard();
        this.currentShape = new Shape(idIterator.next().value);
    }



    
    play() {
        let shape = this.currentShape.shape;
        this.currentShape.positionSelf();
        drop = drop.bind(this);
        const floatDownInterval = window.setInterval(() => drop(shape), 600);
        let height = Number(shape.style.top.slice(0, -2));
    
        function drop(shape) {
            height += 20;
            let classes = this.currentShape.classes;
            let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
            let keepMoving = true;
            for (let squareNumber of squaresToMoveTo) {
                if (this.board[squareNumber - 1] === 'occupied') {
                    keepMoving = false;
                }
            }
            if (classes.includes('i') && height > (bottom + 20)) {
                keepMoving = false;
            } else if (!classes.includes('i') && height > bottom) {
                keepMoving = false;
            }
            if (keepMoving === false) {
                clearInterval(floatDownInterval);
                this.currentShape.updateState('fixed');
                this.updateBoard(this.currentShape.position);
            } else {
                shape.style.top = height + 'px';
                this.currentShape.position = squaresToMoveTo;
            }
            if (this.currentShape.state === 'fixed') {
                this.getNewShape();
                this.play();
            }
        }
    }

    slideLeft() {
        let squaresToMoveTo = this.currentShape.position.map(squareNumber => {
            return squareNumber - 1;
        });
        let keepMoving = true;
        for (let squareNumber of squaresToMoveTo) {
            if (this.board[squareNumber - 1] === 'occupied') {
                keepMoving = false;
            }
        }
        console.log('shape:', this.currentShape);
        console.log('state:', this.currentShape.state);
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }
        // let height = Number(this.currentShape.shape.style.top.slice(0, -2));
        // if (this.currentShape.classes.includes('i') && height > (bottom + 20)) {
        //     keepMoving = false;
        // } else if (!this.currentShape.classes.includes('i') && height > bottom) {
        //     keepMoving = false;
        // }
        console.log('keepMoving:', keepMoving);
        if (keepMoving) {
            let xPos = Number(this.currentShape.shape.style.left.slice(0, -2));
            xPos -= 20;
            this.currentShape.shape.style.left = xPos + 'px';
            this.currentShape.position = squaresToMoveTo;
        }
    }

    slideRight() {
        let squaresToMoveTo = this.currentShape.position.map(squareNumber => {
            return squareNumber + 1;
        });
        let keepMoving = true;
        for (let squareNumber of squaresToMoveTo) {
            if (this.board[squareNumber - 1] === 'occupied') {
                keepMoving = false;
            }
        }
        if (keepMoving) {
            let xPos = Number(this.currentShape.shape.style.left.slice(0, -2));
            xPos += 20;
            this.currentShape.shape.style.left = xPos + 'px';
            this.currentShape.position = squaresToMoveTo;
        }
    }

    getNewShape() {
        this.currentShape = new Shape(idIterator.next().value);
    }
}

class Board {
    constructor() {

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
        for (let squareNumber of occupiedSquares) {
            this.board[squareNumber - 1] = 'occupied';
        }
    }
}

class Shape {
    constructor(id) {
        this.id = id;
        this.possibleShapes = this.createShapes(this.id);
        this.shape = this.getRandomShape(this.possibleShapes);
        this.classes = Array.from(this.shape.classList);
        this.position = this.getStartingPosition();
        this.state = 'moving';
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

    positionSelf() {
        this.shape.style.position = 'absolute';
        this.shape.style.top = '0px';
        if (this.classes.includes('i')) {
            this.shape.style.left = '80px';
        } else {
            this.shape.style.left = '100px';
        }
        document.getElementById('grid').appendChild(this.shape);
    }

    getStartingPosition() {
        let inhabitedSquares;
        if (this.classes.includes('i')) {
            inhabitedSquares = [5, 6, 7, 8];
        } else if (this.classes.includes('o')) {
            inhabitedSquares = [6, 7, 18, 19];
        } else if (this.classes.includes('z')) {
            inhabitedSquares = [6, 7, 19, 20];
        } else if (this.classes.includes('t')) {
            inhabitedSquares = [6, 7, 8, 19];
        } else if (this.classes.includes('l')) {
            inhabitedSquares = [6, 7, 8, 18];
        }
        return inhabitedSquares;
    }

    getNextPositionGoingDown() {
        let nextSquares = this.position.map(squareNumber => {
            return squareNumber + 12;
        });
        return nextSquares;
    }

    updateState(state) {
        this.state = state === 'moving' ? 'moving' : 'fixed';
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

window.addEventListener('keydown', function() {
    console.log('event:', event, 'game:', game);
    if (event.key === 'ArrowLeft') {
        console.log('going to slide left now');
        game.slideLeft();
    } else if (event.key === 'ArrowRight') {
        game.slideRight();
    }
});
