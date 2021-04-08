class Board {
    constructor() {
        this.squares = this.initialize();
        this.rowsNotCompleted = JSON.parse(JSON.stringify(this.squares));
    }

    initialize() {
        let board = [];
        for (let i = 0; i < 20; i++) {
            let row = [];
            for (let j = 0; j < 12; j++) {
                row.push('empty');
            }
            board.push(row);
        }
        return board;
    }

    drawAtStart() {
        let grid = document.getElementById('grid');
        for (let i = 0; i < 20; i++) {
            let row = document.createElement('div');
            for (let j = 0; j < 12; j++) {
                let gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-square');
                row.appendChild(gridSquare);
            }
            row.classList.add('grid-row');
            grid.appendChild(row);
        }
    }

    logTheBoard() {
        for (let i = 0; i < this.squares.length; i++) {
            console.log('board at ' + i + ': ' + this.squares[i]);
        }
    }

    squareIsOccupied([row, col]) {
        return row < 0 || col < 0 || col >= 12 || this.squares[row][col].match(/occupied\([a-z]\)/);
    }

    update(occupiedSquares, name) {
        for (let row of occupiedSquares) {
            for (let i = 0; i < row.length; i++) {
                let { square, type } = row[i];
                if (type === 'filled') {
                    this.squares[square[0]][square[1]] = `occupied(${name})`;
                    this.rowsNotCompleted[square[0]][square[1]] = `occupied(${name})`;
                }
            }
        }
    }

    rowsCompleted() {
        let arrayOfCompletedRowIndices = [];
        for (let i = 0; i < this.rowsNotCompleted.length; i++) {
            if (!this.rowsNotCompleted[i].includes('empty')) {
                arrayOfCompletedRowIndices.push(i);
            }
        }

        return arrayOfCompletedRowIndices;
    }

    colorSquares(shape) {
        let gridRows = Array.from(document.getElementById('grid').querySelectorAll('.grid-row'));

        for (let i = 0; i < shape.position.length; i++) {
            for (let j = 0; j < shape.position[i].length; j++) {
                let { square, type } = shape.position[i][j];
                if (type === 'filled') {
                    let row = gridRows[square[0]];
                    let squares = Array.from(row.children);
                    squares[square[1]].classList.remove('grid-square');
                    squares[square[1]].classList.add('occupied-grid-square', 'filled', shape.name);
                }
            }
        }
    }

    deleteRows(rowIndices) {
        let gridRows = Array.from(document.getElementById('grid').querySelectorAll('.grid-row'));
        for (let rowIndex of rowIndices) {
            let row = gridRows[rowIndex];
            let squares = Array.from(row.children);
            for (let square of squares) {
                square.classList.remove(...Array.from(square.classList));
                square.classList.add('grid-square');
            }
        }
    }

    shiftRowsDown(rowIndices) {
        rowIndices.sort((a, b) => b - a);
        let gridRows = Array.from(document.getElementById('grid').querySelectorAll('.grid-row'));

        for (let rowIndex of rowIndices) {
            for (let i = rowIndex; i > 0; i--) {
                for (let k = 0; k < this.squares[i].length; k++) {
                    this.squares[i][k] = this.squares[i - 1][k];
                    this.rowsNotCompleted[i][k] = this.squares[i - 1][k];
                }

                let row = gridRows[i];
                let squares = Array.from(row.children);
                let prevRow = gridRows[i - 1];
                let prevSquares = Array.from(prevRow.children);

                for (let j = 0; j < squares.length; j++) {
                    squares[j].classList.remove(...Array.from(squares[j].classList));
                    squares[j].classList.add(...Array.from(prevSquares[j].classList));
                }
            }
        }
    }
}
