class Shape {
    constructor(id) {
        this.id = id;
        this.element = this.getRandomShape(this.createShapes(this.id));
        this.classes = Array.from(this.element.classList);
        this.squares = Array.from(this.element.children);
        this.position = this.getStartingPosition();
        this.degrees = 0;
        this.state = 'moving';
    }

    createShapes(id) {
        let shapeNames = ['i', 'o', 'z', 't', 'l'];
    
        let tetrominoes = shapeNames.map(name => {
            let shape = document.createElement('div');
            shape.classList.add('shape');
            shape.classList.add(name);
            shape.id = name + id;
            for (let i = 0; i < 16; i++) {
                let square = document.createElement('div');
                shape.appendChild(square);
            }
            return shape;
        });
    
        return tetrominoes;
    }

    getRandomShape(possibleShapes) {
        return possibleShapes[Math.floor(Math.random() * 5)];
    }

    getNextPositionAsRotated() {
        let positionToRotateTo = JSON.parse(JSON.stringify(this.position));

        for (let i = 0; i < positionToRotateTo.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.classes.includes('o')) {
                    return null;
                }
                const squareShouldBeFilled = checkSquare.bind(this);
                if (squareShouldBeFilled(i, j)) {
                    positionToRotateTo[i][j].type = 'filled';
                } else {
                    positionToRotateTo[i][j].type = 'empty';
                }
            }
        }

        return positionToRotateTo;

        function checkSquare(i, j) {
            if (this.classes.includes('i') && this.degrees === 0) {
                return (
                    i === 0 && j === 1 ||
                    i === 1 && j === 1 ||
                    i === 2 && j === 1 ||
                    i === 3 && j === 1
                ); 
            } else if (this.classes.includes('i') && this.degrees === 180) {
                return (
                    i === 1 && j === 0 ||
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3
                );
            } else if (this.classes.includes('z') && this.degrees === 0) {
                return (
                    i === 0 && j === 2 ||
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 2 && j === 1
                );
            } else if (this.classes.includes('z') && this.degrees === 90) {
                return (
                    i === 0 && j === 1 ||
                    i === 0 && j === 2 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3
                );
            } else if (this.classes.includes('z') && this.degrees === 180) {
                return (
                    i === 0 && j === 3 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3 ||
                    i === 2 && j === 2
                );
            } else if (this.classes.includes('z') && this.degrees === 270) {
                return (
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 2 && j === 2 ||
                    i === 2 && j === 3
                );
            } else if (this.classes.includes('t') && this.degrees === 0) {
                return (
                    i === 0 && j === 2 ||
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 2 && j === 2
                );
            } else if (this.classes.includes('t') && this.degrees === 90) {
                return (
                    i === 0 && j === 2 ||
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3
                );
            } else if (this.classes.includes('t') && this.degrees === 180) {
                return (
                    i === 0 && j === 2 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3 ||
                    i === 2 && j === 2
                );
            } else if (this.classes.includes('t') && this.degrees === 270) {
                return (
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3 ||
                    i === 2 && j === 2
                );
            } else if (this.classes.includes('l') && this.degrees === 0) {
                return (
                    i === 0 && j === 1 ||
                    i === 0 && j === 2 ||
                    i === 1 && j === 2 ||
                    i === 2 && j === 2
                );
            } else if (this.classes.includes('l') && this.degrees === 90) {
                return (
                    i === 0 && j === 3 ||
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3
                );
            } else if (this.classes.includes('l') && this.degrees === 180) {
                return (
                    i === 0 && j === 2 ||
                    i === 1 && j === 2 ||
                    i === 2 && j === 2 ||
                    i === 2 && j === 3
                );
            } else if (this.classes.includes('l') && this.degrees === 270) {
                return (
                    i === 1 && j === 1 ||
                    i === 1 && j === 2 ||
                    i === 1 && j === 3 ||
                    i === 2 && j === 1
                );
            }
        } 
    }

    drawAtStart() {
        this.element.style.position = 'absolute';
        this.element.style.top = '-20px';
        this.element.style.left = '80px';
        for (let i = 0; i < this.position.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.position[i][j].type === 'filled') {
                    this.squares[i * 4 + j].classList.add('filled');
                } else {
                    this.squares[i * 4 + j].classList.remove('filled');
                }
            }
        }
        document.getElementById('grid').appendChild(this.element);
    }

    getStartingPosition() {
        let inhabitedSquares = [
            [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
            [ {square: [0, 4], type: 'empty'}, {square: [0, 5], type: 'empty'}, {square: [0, 6], type: 'empty'}, {square: [0, 7], type: 'empty'}],
            [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'empty'}, {square: [1, 6], type: 'empty'}, {square: [1, 7], type: 'empty'}],
            [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
        ];

        if (this.classes.includes('i')) {
            inhabitedSquares[1].forEach(object => object.type = 'filled');
        } else if (this.classes.includes('o')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][1].type = inhabitedSquares[2][2].type = 'filled';
        } else if (this.classes.includes('z')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][2].type = inhabitedSquares[2][3].type = 'filled';
        } else if (this.classes.includes('t')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[1][3].type = inhabitedSquares[2][2].type = 'filled';
        } else if (this.classes.includes('l')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[1][3].type = inhabitedSquares[2][1].type = 'filled';
        }

        return inhabitedSquares;
    }

    getNextPositionGoingDown() {
        let nextSquares = this.position.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0] + 1, square[1]], type };
            });
        });
        return nextSquares;
    }

    getNextPositionGoingLeft() {
        let nextSquares = this.position.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0], square[1] - 1], type };
            });
        });
        return nextSquares;
    }

    getNextPositionGoingRight() {
        let nextSquares = this.position.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0], square[1] + 1], type };
            });
        });
        return nextSquares;
    }

    shift(styleProperty, incrementAmount) {
        let currentValue = Number(this.element.style[styleProperty].slice(0, -2));
        currentValue += incrementAmount;
        this.element.style[styleProperty] = currentValue + 'px';
    }

    rotate() {
        for (let i = 0; i < this.position.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.position[i][j].type === 'filled' && this.position[i][j].square[0] >= 0) {
                    this.squares[i * 4 + j].classList.add('filled');
                } else {
                    this.squares[i * 4 + j].classList.remove('filled');
                }
            }
        }
        if (this.classes.includes('i')) {
            this.degrees = (this.degrees + 180) % 360;
        } else {
            this.degrees = (this.degrees + 90) % 360;
        }
    }

    getOutermostColumns() {
        let columns = [];
        for (let i = 0; i < this.position.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.position[i][j].type === 'filled') {
                    columns.push(this.position[i][j].square[1]);
                }
            }
        }
        return [Math.min(...columns), Math.max(...columns)];
    }

    updatePosition(squares) {
        this.position = squares;
    }

    updateState(state) {
        this.state = state === 'moving' ? 'moving' : 'fixed';
    }
}
