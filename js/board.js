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

    squareIsOccupied(square) {
        return square[0] < 0 ||  square[1] < 0 || square[1] >= 12 || this.squares[square[0]][square[1]] === 'occupied';
    }

    update(occupiedSquares) {
        for (let row of occupiedSquares) {
            for (let i = 0; i < row.length; i++) {
                let { square, type } = row[i];
                if (type === 'filled') {
                    this.squares[square[0]][square[1]] = 'occupied';
                }
            }
        }
    }
}
