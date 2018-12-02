class Game {
    constructor() {
        this.board = new Board();
        this.idIterator = this.IdGenerator();
        this.currentShape = new Shape(this.idIterator.next().value);
    }

    *IdGenerator() {
        let id = 0;
        while (true) {
            yield ++id;
        }
    }

    start() {
        this.board.drawAtStart();

        window.addEventListener('keydown', function() {
            if (event.key === 'ArrowLeft') this.slideLeft();
            else if (event.key === 'ArrowRight') this.slideRight();
            else if (event.key === 'ArrowDown') this.drop();
        }.bind(this));

        this.currentShape.drawAtStart();
        this.play();
    }
 
    play() {
        this.floatDownInterval = window.setInterval(this.drop.bind(this), 500);
    }

    drop() {
        if (this.shapeShouldBecomeFixed()) {
            this.stopCurrentShape();
        } else {
            let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.draw('top', 20);

            if (this.shapeShouldBecomeFixed()) {
                this.stopCurrentShapeAndReleaseNewShape();
            }
        }
    }

    slideLeft() {
        let squaresToMoveTo = this.currentShape.getNextPositionGoingLeft();
        let keepMoving = true;
        for (let square of squaresToMoveTo) {
            if (square[1] < 0 || this.board.squares[square[0]][square[1]] === 'occupied') {
                keepMoving = false;
            }
        }
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }

        if (keepMoving) {
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.draw('left', -20);

            if (this.shapeShouldBecomeFixed()) {
                this.stopCurrentShapeAndReleaseNewShape();
            }
        }
    }

    slideRight() {
        let squaresToMoveTo = this.currentShape.getNextPositionGoingRight();
        let keepMoving = true;
        for (let square of squaresToMoveTo) {
            if (square[1] >= 12 || this.board.squares[square[0]][square[1]] === 'occupied') {
                keepMoving = false;
            }
        }
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }

        if (keepMoving) {
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.draw('left', 20);

            if (this.shapeShouldBecomeFixed()) {
                this.stopCurrentShapeAndReleaseNewShape();
            }
        }
    }

    shapeShouldBecomeFixed() {
        let squaresToMoveToNext = this.currentShape.getNextPositionGoingDown();
        for (let square of squaresToMoveToNext) {
            if (square[0] >= 20 || this.board.squares[square[0]][square[1]] === 'occupied') {
                return true;
            }
        }
        return false;
    }

    getNewShape() {
        this.currentShape = new Shape(this.idIterator.next().value);
        this.currentShape.drawAtStart();
    }

    stopCurrentShape() {
        clearInterval(this.floatDownInterval);
        this.currentShape.updateState('fixed');
        this.board.update(this.currentShape.position);
    }

    stopCurrentShapeAndReleaseNewShape() {
        this.stopCurrentShape();
        this.getNewShape();
        this.play();
    }
}
