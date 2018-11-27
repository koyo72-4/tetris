class Game {
    constructor() {
        this.board = new Board();
        this.currentShape = new Shape(idIterator.next().value);
    }
 
    play() {
        this.currentShape.positionSelf();
        drop = drop.bind(this);

        const floatDownInterval = window.setInterval(() => drop(this.currentShape.shape), 1050);
        const classes = this.currentShape.classes;
        let height = Number(this.currentShape.shape.style.top.slice(0, -2));
        console.log('classes:', classes, 'height:', height, 'bottom:', bottom);
    
        function drop(shape) {
            height += 20; console.log('height again:', height);
            let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
            let keepMoving = true;

            for (let squareNumber of squaresToMoveTo) {
                if (this.board.squares[squareNumber - 1] === 'occupied') {
                    keepMoving = false;
                }
            }
            if (this.currentShape.state === 'fixed') {
                keepMoving = false;
            } else if (classes.includes('i') && height > (bottom + 20)) {
                keepMoving = false;
            } else if (!classes.includes('i') && height > bottom) {
                keepMoving = false;
            }

            if (keepMoving === false) {
                clearInterval(floatDownInterval);
                this.currentShape.updateState('fixed');
                this.board.update(this.currentShape.position);

                if (this.currentShape.state === 'fixed') {
                    this.getNewShape();
                    this.play();
                }
            } else {
                shape.style.top = height + 'px';
                this.currentShape.position = squaresToMoveTo;
                if (this.shapeShouldBecomeFixed()) {
                    clearInterval(floatDownInterval);
                    this.currentShape.updateState('fixed');
                    this.board.update(this.currentShape.position);
                }

                if (this.currentShape.state === 'fixed') {
                    this.getNewShape();
                    this.play();
                }
            }
        }
    }

    slideLeft() {
        let squaresToMoveTo = this.currentShape.getNextPositionGoingLeft();
        let keepMoving = true;
        for (let squareNumber of squaresToMoveTo) {
            if (this.board.squares[squareNumber - 1] === 'occupied') {
                keepMoving = false;
            }
        }
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }

        if (keepMoving) {
            let xPos = Number(this.currentShape.shape.style.left.slice(0, -2));
            xPos -= 20;
            this.currentShape.shape.style.left = xPos + 'px';
            this.currentShape.position = squaresToMoveTo;

            if (this.shapeShouldBecomeFixed()) {
                this.currentShape.updateState('fixed');
                this.board.update(this.currentShape.position);
            }
        }
    }

    slideRight() {
        let squaresToMoveTo = this.currentShape.getNextPositionGoingRight();
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

            if (this.shapeShouldBecomeFixed()) {
                this.currentShape.updateState('fixed');
                this.board.update(this.currentShape.position);
            }
        }
    }

    shapeShouldBecomeFixed() {
        let squaresToMoveToNext = this.currentShape.getNextPositionGoingDown();
        for (let squareNumber of squaresToMoveToNext) {
            if (this.board.squares[squareNumber - 1] === 'occupied') {
                return true;
            }
        }
        let height = Number(this.currentShape.shape.style.top.slice(0, -2)) + 20;
        if (this.currentShape.classes.includes('i') && height > (bottom + 20)) {
            return true;
        } else if (!this.currentShape.classes.includes('i') && height > bottom) {
            return true;
        }
        return false;
    }

    getNewShape() {
        this.currentShape = new Shape(idIterator.next().value);
    }
}
