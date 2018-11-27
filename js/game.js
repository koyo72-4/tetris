class Game {
    constructor() {
        this.board = new Board();
        this.idIterator = this.IdGenerator();
        this.currentShape = new Shape(this.idIterator.next().value);
    }

    *IdGenerator() {
        let id = 0;
        while (true) {
            console.log('id:', id);
            yield ++id;
        }
    }

    start() {
        this.board.draw();

        window.addEventListener('keydown', function() {
            if (event.key === 'ArrowLeft') this.slideLeft();
            else if (event.key === 'ArrowRight') this.slideRight();
            else if (event.key === 'ArrowDown') this.slideDown();
        }.bind(this));

        this.currentShape.positionSelf();
        this.play();
    }
 
    play() {
        this.floatDownInterval = window.setInterval(this.drop.bind(this), 500);
    }

    drop() {
        let height = this.currentShape.height + 20;
        let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
        let keepMoving = true;

        for (let squareNumber of squaresToMoveTo) {
            if (this.board.squares[squareNumber - 1] === 'occupied') {
                keepMoving = false;
            }
        }
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        } else if (this.currentShape.classes.includes('i') && height > (bottom + 20)) {
            keepMoving = false;
        } else if (!this.currentShape.classes.includes('i') && height > bottom) {
            keepMoving = false;
        }

        if (keepMoving === false) {
            clearInterval(this.floatDownInterval);
            this.currentShape.updateState('fixed');
            this.board.update(this.currentShape.position);
        } else {
            this.currentShape.shape.style.top = height + 'px';
            this.currentShape.height = height;
            this.currentShape.position = squaresToMoveTo;
            if (this.shapeShouldBecomeFixed()) {
                clearInterval(this.floatDownInterval);
                this.currentShape.updateState('fixed');
                this.board.update(this.currentShape.position);
            }
        }

        if (this.currentShape.state === 'fixed') {
            this.getNewShape();
            this.play();
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
                clearInterval(this.floatDownInterval);
                this.getNewShape();
                this.play();
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
                clearInterval(this.floatDownInterval);
                this.getNewShape();
                this.play();
            }
        }
    }

    slideDown() {
        console.log('time to slide down');
        let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
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
            let height = this.currentShape.height + 20;
            this.currentShape.shape.style.top = height + 'px';
            this.currentShape.height = height;
            this.currentShape.position = squaresToMoveTo;

            if (this.shapeShouldBecomeFixed()) {
                this.currentShape.updateState('fixed');
                this.board.update(this.currentShape.position);
                clearInterval(this.floatDownInterval);
                this.getNewShape();
                this.play();
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
        let height = this.currentShape.height + 20;
        if (this.currentShape.classes.includes('i') && height > (bottom + 20)) {
            return true;
        } else if (!this.currentShape.classes.includes('i') && height > bottom) {
            return true;
        }
        return false;
    }

    getNewShape() {
        this.currentShape = new Shape(this.idIterator.next().value);
        this.currentShape.positionSelf();
    }
}
