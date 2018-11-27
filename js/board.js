class Board {
    constructor() {
        this.squares = this.initialize();
    }

    initialize() {
        let board = [];
        for (let i = 1; i <= 240; i++) {
            board.push(i);
        }
        return board;
    }

    draw() {
        let grid = document.getElementById('grid');
        for (let i = 1; i <= 240; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            grid.appendChild(square);
        }
    }

    update(occupiedSquares) {
        for (let squareNumber of occupiedSquares) {
            this.squares[squareNumber - 1] = 'occupied';
        }
    }
}
