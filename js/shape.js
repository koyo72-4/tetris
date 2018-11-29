class Shape {
    constructor(id) {
        this.id = id;
        this.element = this.getRandomShape(this.createShapes(this.id));
        this.classes = Array.from(this.element.classList);
        this.position = this.getStartingPosition();
        this.height = Number(this.element.style.top.slice(0, -2));
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

    positionSelf() {
        this.element.style.position = 'absolute';
        this.element.style.top = '0px';
        if (this.classes.includes('i')) this.element.style.left = '80px';
        else this.element.style.left = '100px';
        document.getElementById('grid').appendChild(this.element);
    }

    getStartingPosition() {
        let inhabitedSquares;
        if (this.classes.includes('i')) inhabitedSquares = [5, 6, 7, 8];
        else if (this.classes.includes('o')) inhabitedSquares = [6, 7, 18, 19];
        else if (this.classes.includes('z')) inhabitedSquares = [6, 7, 19, 20];
        else if (this.classes.includes('t')) inhabitedSquares = [6, 7, 8, 19];
        else if (this.classes.includes('l')) inhabitedSquares = [6, 7, 8, 18];
        return inhabitedSquares;
    }

    getNextPositionGoingDown() {
        let nextSquares = this.position.map(squareNumber => {
            return squareNumber + 12;
        });
        return nextSquares;
    }

    getNextPositionGoingLeft() {
        let nextSquares = this.position.map(squareNumber => {
            return squareNumber - 1;
        });
        return nextSquares;
    }

    getNextPositionGoingRight() {
        let nextSquares = this.position.map(squareNumber => {
            return squareNumber + 1;
        });
        return nextSquares;
    }

    updateState(state) {
        this.state = state === 'moving' ? 'moving' : 'fixed';
    }
}
