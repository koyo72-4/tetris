class Game {
    constructor() {
        this.board = new Board();
        this.currentShape = new Shape(idIterator.next().value);
    }
 
    play() {
        let shape = this.currentShape.shape;
        this.currentShape.positionSelf();
        drop = drop.bind(this);
        const floatDownInterval = window.setInterval(() => drop(shape), 600);
        let height = Number(shape.style.top.slice(0, -2));
    
        function drop(shape) {
            height += 20;
            let classes = this.currentShape.classes;
            let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
            let keepMoving = true;
            for (let squareNumber of squaresToMoveTo) {
                if (this.board.squares[squareNumber - 1] === 'occupied') {
                    keepMoving = false;
                }
            }
            if (classes.includes('i') && height > (bottom + 20)) {
                keepMoving = false;
            } else if (!classes.includes('i') && height > bottom) {
                keepMoving = false;
            }
            if (keepMoving === false) {
                clearInterval(floatDownInterval);
                this.currentShape.updateState('fixed');
                this.board.updateBoard(this.currentShape.position);
            } else {
                shape.style.top = height + 'px';
                this.currentShape.position = squaresToMoveTo;
            }
            if (this.currentShape.state === 'fixed') {
                this.getNewShape();
                this.play();
            }
        }
    }

    slideLeft() {
        let squaresToMoveTo = this.currentShape.position.map(squareNumber => {
            return squareNumber - 1;
        });
        let keepMoving = true;
        for (let squareNumber of squaresToMoveTo) {
            if (this.board.squares[squareNumber - 1] === 'occupied') {
                keepMoving = false;
            }
        }
        console.log('shape:', this.currentShape);
        console.log('state:', this.currentShape.state);
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }
        // let height = Number(this.currentShape.shape.style.top.slice(0, -2));
        // if (this.currentShape.classes.includes('i') && height > (bottom + 20)) {
        //     keepMoving = false;
        // } else if (!this.currentShape.classes.includes('i') && height > bottom) {
        //     keepMoving = false;
        // }
        console.log('keepMoving:', keepMoving);
        if (keepMoving) {
            let xPos = Number(this.currentShape.shape.style.left.slice(0, -2));
            xPos -= 20;
            this.currentShape.shape.style.left = xPos + 'px';
            this.currentShape.position = squaresToMoveTo;
        }
    }

    slideRight() {
        let squaresToMoveTo = this.currentShape.position.map(squareNumber => {
            return squareNumber + 1;
        });
        let keepMoving = true;
        for (let squareNumber of squaresToMoveTo) {
            if (this.board.squares[squareNumber - 1] === 'occupied') {
                keepMoving = false;
            }
        }
        if (keepMoving) {
            let xPos = Number(this.currentShape.shape.style.left.slice(0, -2));
            xPos += 20;
            this.currentShape.shape.style.left = xPos + 'px';
            this.currentShape.position = squaresToMoveTo;
        }
    }

    getNewShape() {
        this.currentShape = new Shape(idIterator.next().value);
    }
}
