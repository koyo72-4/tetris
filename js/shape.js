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
            for (let i = 0; i < 4; i++) {
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

    getStartingPosition() {
        let inhabitedSquares;
        if (this.classes.includes('i')) inhabitedSquares = [[0, 4], [0, 5], [0, 6], [0, 7]];
        else if (this.classes.includes('o')) inhabitedSquares = [[0, 5], [0, 6], [1, 5], [1, 6]];
        else if (this.classes.includes('z')) inhabitedSquares = [[0, 5], [0, 6], [1, 6], [1, 7]];
        else if (this.classes.includes('t')) inhabitedSquares = [[0, 5], [0, 6], [0, 7], [1, 6]];
        else if (this.classes.includes('l')) inhabitedSquares = [[0, 5], [0, 6], [0, 7], [1, 5]];
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
