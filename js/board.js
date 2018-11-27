class Board {
    constructor() {
        this.squares = this.initializeBoard();
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
            this.squares[squareNumber - 1] = 'occupied';
        }
    }
}
