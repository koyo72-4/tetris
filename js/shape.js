class Shape {
    constructor(id, possibleShapes) {
        this.id = id;
        this.element = this.getRandomShape(id, possibleShapes);
        this.classes = Array.from(this.element.classList);
        this.squares = Array.from(this.element.children);
        this.position = ShapeSchema.getStartingPosition(this.classes);
        this.degrees = 0;
        this.state = 'moving';
    }

    static createShapes() {
        let shapeNames = ['i', 'o', 't', 'z', 's', 'l', 'j'];
    
        let tetrominoes = shapeNames.map(name => {
            let shape = document.createElement('div');
            shape.classList.add('shape');
            shape.classList.add(name);
            for (let i = 0; i < 16; i++) {
                let square = document.createElement('div');
                shape.appendChild(square);
            }
            return shape;
        });
    
        return tetrominoes;
    }

    getRandomShape(id, possibleShapes) {
        let randomIndex = Math.floor(Math.random() * possibleShapes.length);
        let randomShape = possibleShapes.splice(randomIndex, 1)[0];
        randomShape.id = id;
        return randomShape;
    }

    getNextPositionAsRotated() {
        let positionToRotateTo = JSON.parse(JSON.stringify(this.position));

        for (let i = 0; i < positionToRotateTo.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.classes.includes('o')) {
                    return null;
                }
                if (ShapeSchema.squareShouldBeFilled(this, i, j)) {
                    positionToRotateTo[i][j].type = 'filled';
                } else {
                    positionToRotateTo[i][j].type = 'empty';
                }
            }
        }

        return positionToRotateTo;
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

    updateState(newState) {
        this.state = newState === 'moving' ? 'moving' : 'fixed';
    }
}
