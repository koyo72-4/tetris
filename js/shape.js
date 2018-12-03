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

        if (this.classes.includes('i') && this.degrees === 0) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 1 ||
                        i === 1 && j === 1 ||
                        i === 2 && j === 1 ||
                        i === 3 && j === 1
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('i') && this.degrees === 180) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 1 && j === 0 ||
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('o')) {
            return null;
        } else if (this.classes.includes('z') && this.degrees === 0) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 2 ||
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 2 && j === 1
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('z') && this.degrees === 90) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 1 ||
                        i === 0 && j === 2 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('z') && this.degrees === 180) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 3 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3 ||
                        i === 2 && j === 2
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('z') && this.degrees === 270) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 2 && j === 2 ||
                        i === 2 && j === 3
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('t') && this.degrees === 0) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 2 ||
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 2 && j === 2
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('t') && this.degrees === 90) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 2 ||
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('t') && this.degrees === 180) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 2 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3 ||
                        i === 2 && j === 2
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('t') && this.degrees === 270) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3 ||
                        i === 2 && j === 2
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('l') && this.degrees === 0) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 1 ||
                        i === 0 && j === 2 ||
                        i === 1 && j === 2 ||
                        i === 2 && j === 2
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('l') && this.degrees === 90) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 3 ||
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('l') && this.degrees === 180) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 0 && j === 2 ||
                        i === 1 && j === 2 ||
                        i === 2 && j === 2 ||
                        i === 2 && j === 3
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
        } else if (this.classes.includes('l') && this.degrees === 270) {
            for (let i = 0; i < positionToRotateTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (
                        i === 1 && j === 1 ||
                        i === 1 && j === 2 ||
                        i === 1 && j === 3 ||
                        i === 2 && j === 1
                    ) {
                        positionToRotateTo[i][j].type = 'filled';
                    } else {
                        positionToRotateTo[i][j].type = 'empty';
                    }
                }
            }
            return positionToRotateTo;
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
        let inhabitedSquares;
        if (this.classes.includes('i')) {
            inhabitedSquares = [
                [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
                [ {square: [0, 4], type: 'filled'}, {square: [0, 5], type: 'filled'}, {square: [0, 6], type: 'filled'}, {square: [0, 7], type: 'filled'}],
                [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'empty'}, {square: [1, 6], type: 'empty'}, {square: [1, 7], type: 'empty'}],
                [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
            ];
        } else if (this.classes.includes('o')) {
            inhabitedSquares = [
                [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
                [ {square: [0, 4], type: 'empty'}, {square: [0, 5], type: 'filled'}, {square: [0, 6], type: 'filled'}, {square: [0, 7], type: 'empty'}],
                [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'filled'}, {square: [1, 6], type: 'filled'}, {square: [1, 7], type: 'empty'}],
                [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
            ];
        } else if (this.classes.includes('z')) {
            inhabitedSquares = [
                [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
                [ {square: [0, 4], type: 'empty'}, {square: [0, 5], type: 'filled'}, {square: [0, 6], type: 'filled'}, {square: [0, 7], type: 'empty'}],
                [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'empty'}, {square: [1, 6], type: 'filled'}, {square: [1, 7], type: 'filled'}],
                [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
            ];
        } else if (this.classes.includes('t')) {
            inhabitedSquares = [
                [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
                [ {square: [0, 4], type: 'empty'}, {square: [0, 5], type: 'filled'}, {square: [0, 6], type: 'filled'}, {square: [0, 7], type: 'filled'}],
                [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'empty'}, {square: [1, 6], type: 'filled'}, {square: [1, 7], type: 'empty'}],
                [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
            ];
        } else if (this.classes.includes('l')) {
            inhabitedSquares = [
                [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
                [ {square: [0, 4], type: 'empty'}, {square: [0, 5], type: 'filled'}, {square: [0, 6], type: 'filled'}, {square: [0, 7], type: 'filled'}],
                [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'filled'}, {square: [1, 6], type: 'empty'}, {square: [1, 7], type: 'empty'}],
                [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
            ];
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
