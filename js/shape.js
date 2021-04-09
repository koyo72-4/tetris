class Shape {
    constructor(id, possibleShapes) {
        this.id = id;
        this.element = this.getRandomShape(id, possibleShapes);
        this.name = Array.from(this.element.classList).filter(nameOfClass => nameOfClass !== 'shape')[0];
        this.squares = Array.from(this.element.children);
        this.position = ShapeSchema.getStartingPosition(this.name);
        this.degrees = 0;
        this.orientation = this.getOrientation(this.degrees, this.name);
        this.state = 'moving';
    }

    static createShapes() {
        // let shapeNames = ['i', 'o', 't', 'z', 's', 'l', 'j'];
        let shapeNames = ['o', 'i', 'l'];
    
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

    getOrientation(degrees, name) {
        if (name === 'i') {
            return degrees === 0 ? 'horizontal' : 'vertical';
        } else {
            switch(degrees) {
                case 0:
                case 180:
                    return 'horizontal';
                case 90:
                case 270:
                    return 'vertical';
            }
        }
    }

    updateOrientation() {
        if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
        } else {
            this.orientation = 'horizontal';
        }
    }

    getNextPositionAsRotated() {
        let positionToRotateTo = JSON.parse(JSON.stringify(this.position));

        for (let i = 0; i < positionToRotateTo.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.name === 'o') {
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
        if (this.name === 'i') {
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

    removeFromDOM() {
        this.element.remove();
    }

    getNextFilledSquares(squaresToMoveTo) {
        if (this.name === 'i') {  // 0 is horizontal, 180 is vertical
            if (this.degrees === 0) {
                const objectOfSquares = {
                    A: squaresToMoveTo[0][1].square,
                    G: squaresToMoveTo[1][1].square,
                    B: squaresToMoveTo[2][1].square,
                    C: squaresToMoveTo[3][1].square
                };
                objectOfSquares.E = [objectOfSquares.A[0] - 2, objectOfSquares.A[1]];
                objectOfSquares.F = [objectOfSquares.A[0] - 1, objectOfSquares.A[1]];
                objectOfSquares.D = [objectOfSquares.C[0] + 1, objectOfSquares.C[1]];
                return objectOfSquares;
            } else if (this.degrees === 180) {
                const objectOfSquares = {
                    A: squaresToMoveTo[1][0].square,
                    G: squaresToMoveTo[1][1].square,
                    B: squaresToMoveTo[1][2].square,
                    C: squaresToMoveTo[1][3].square
                };
                objectOfSquares.E = [objectOfSquares.A[0], objectOfSquares.A[1] - 2];
                objectOfSquares.F = [objectOfSquares.A[0], objectOfSquares.A[1] - 1];
                objectOfSquares.D = [objectOfSquares.C[0], objectOfSquares.C[1] + 1];
                return objectOfSquares;
            }
        } else if (this.name === 'l') {  // 0 is j--, 90 is 7, 180 is __i, 270 is L
            if (this.degrees === 0) {
                const objectOfSquares = {
                    A: squaresToMoveTo[0][1].square,
                    B: squaresToMoveTo[0][2].square,
                    G: squaresToMoveTo[1][2].square,
                    C: squaresToMoveTo[2][2].square
                };
                objectOfSquares.E = [objectOfSquares.A[0] - 1, objectOfSquares.A[1]];
                objectOfSquares.F = [objectOfSquares.B[0] - 1, objectOfSquares.B[1]];
                objectOfSquares.D = [objectOfSquares.C[0] + 1, objectOfSquares.C[1]];
                return objectOfSquares;
            } else if (this.degrees === 90) {
                const objectOfSquares = {
                    A: squaresToMoveTo[0][3].square,
                    C: squaresToMoveTo[1][1].square,
                    G: squaresToMoveTo[1][2].square,
                    B: squaresToMoveTo[1][3].square
                };
                objectOfSquares.E = [objectOfSquares.A[0], objectOfSquares.A[1] + 1];
                objectOfSquares.F = [objectOfSquares.B[0], objectOfSquares.B[1] + 1];
                objectOfSquares.D = [objectOfSquares.C[0], objectOfSquares.C[1] - 1];
                return objectOfSquares;
            } else if (this.degrees === 180) {
                const objectOfSquares = {
                    A: squaresToMoveTo[0][2].square,
                    G: squaresToMoveTo[1][2].square,
                    B: squaresToMoveTo[2][2].square,
                    C: squaresToMoveTo[2][3].square
                };
                objectOfSquares.E = [objectOfSquares.A[0] + 1, objectOfSquares.A[1]];
                objectOfSquares.F = [objectOfSquares.B[0] + 1, objectOfSquares.B[1]];
                objectOfSquares.D = [objectOfSquares.C[0] - 1, objectOfSquares.C[1]];
                return objectOfSquares;
            } else if (this.degrees === 270) {
                const objectOfSquares = {
                    B: squaresToMoveTo[1][0].square,
                    G: squaresToMoveTo[1][2].square,
                    A: squaresToMoveTo[2][0].square,
                    C: squaresToMoveTo[1][3].square
                };
                objectOfSquares.E = [objectOfSquares.A[0], objectOfSquares.A[1] - 1];
                objectOfSquares.F = [objectOfSquares.B[0], objectOfSquares.B[1] - 1];
                objectOfSquares.D = [objectOfSquares.C[0], objectOfSquares.C[1] + 1];
                return objectOfSquares;
            }
        }
    }
}
