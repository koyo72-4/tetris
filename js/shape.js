class Shape {
    constructor(id) {
        this.id = id;
        this.element = this.getRandomShape(this.createShapes(this.id));
        this.classes = Array.from(this.element.classList);
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
            for (let i = 0; i < 16; i++) {
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

    drawAtStart() {
        this.element.style.position = 'absolute';
        this.element.style.top = '0px';
        if (this.classes.includes('i')) this.element.style.left = '80px';
        else this.element.style.left = '100px';
        document.getElementById('grid').appendChild(this.element);
    }

    // getStartingPosition() {
    //     let inhabitedSquares;
    //     if (this.classes.includes('i')) inhabitedSquares = [[0, 4], [0, 5], [0, 6], [0, 7]];
    //     else if (this.classes.includes('o')) inhabitedSquares = [[0, 5], [0, 6], [1, 5], [1, 6]];
    //     else if (this.classes.includes('z')) inhabitedSquares = [[0, 5], [0, 6], [1, 6], [1, 7]];
    //     else if (this.classes.includes('t')) inhabitedSquares = [[0, 5], [0, 6], [0, 7], [1, 6]];
    //     else if (this.classes.includes('l')) inhabitedSquares = [[0, 5], [0, 6], [0, 7], [1, 5]];
    //     return inhabitedSquares;
    // }

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
                [ {square: [0, 4], type: 'filled'}, {square: [0, 5], type: 'filled'}, {square: [0, 6], type: 'empty'}, {square: [0, 7], type: 'empty'}],
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
        let nextSquares = this.position.map(square => {
            return [square[0] + 1, square[1]];
        });
        return nextSquares;
    }

    getNextPositionGoingLeft() {
        let nextSquares = this.position.map(square => {
            return [square[0], square[1] - 1];
        });
        return nextSquares;
    }

    getNextPositionGoingRight() {
        let nextSquares = this.position.map(square => {
            return [square[0], square[1] + 1];
        });
        return nextSquares;
    }

    draw(styleProperty, incrementAmount) {
        let currentValue = Number(this.element.style[styleProperty].slice(0, -2));
        currentValue += incrementAmount;
        this.element.style[styleProperty] = currentValue + 'px';
    }

    updatePosition(squares) {
        this.position = squares;
    }

    updateState(state) {
        this.state = state === 'moving' ? 'moving' : 'fixed';
    }
}
