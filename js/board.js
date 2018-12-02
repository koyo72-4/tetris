class Board {
    constructor() {
        this.squares = this.initialize();
    }

    initialize() {
        let board = [];
        for (let i = 0; i < 20; i++) {
            let row = [];
            for (let i = 0; i < 12; i++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
    }

    drawAtStart() {
        let grid = document.getElementById('grid');
        for (let i = 0; i < 240; i++) {
            let gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            grid.appendChild(gridSquare);
        }
    }

    update(occupiedSquares) {
        for (let square of occupiedSquares) {
            this.squares[square[0]][square[1]] = 'occupied';
        }
    }
}
