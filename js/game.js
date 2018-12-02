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
            else if (event.key === 'ArrowUp') this.rotateShape();
        }.bind(this));

        this.currentShape.drawAtStart();
        this.play();
    }
 
    play() {
        this.floatDownInterval = window.setInterval(this.drop.bind(this), 2000);
    }

    drop() {
        if (this.shapeShouldBecomeFixed()) {
            this.stopCurrentShape();
        } else {
            let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.shift('top', 20);

            if (this.shapeShouldBecomeFixed()) {
                this.stopCurrentShapeAndReleaseNewShape();
            }
        }
    }

    slideLeft() {
        let keepMoving = true;
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }
        
        let squaresToMoveTo = this.currentShape.getNextPositionGoingLeft();
        for (let row of squaresToMoveTo) {
            for (let i = 0; i < row.length; i++) {
                let { square, type } = row[i];
                if (type === 'filled') {
                    if (square[1] < 0 || this.board.squares[square[0]][square[1]] === 'occupied') {
                        keepMoving = false;
                    }
                }
            }
        }

        if (keepMoving) {
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.shift('left', -20);

            if (this.shapeShouldBecomeFixed()) {
                this.stopCurrentShapeAndReleaseNewShape();
            }
        }
    }

    slideRight() {
        let keepMoving = true;
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }

        let squaresToMoveTo = this.currentShape.getNextPositionGoingRight();
        for (let row of squaresToMoveTo) {
            for (let i = 0; i < row.length; i++) {
                let { square, type } = row[i];
                if (type === 'filled') {
                    if (square[1] >= 12 || this.board.squares[square[0]][square[1]] === 'occupied') {
                        keepMoving = false;
                    }
                }
            }
        }

        if (keepMoving) {
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.shift('left', 20);

            if (this.shapeShouldBecomeFixed()) {
                this.stopCurrentShapeAndReleaseNewShape();
            }
        }
    }

    rotateShape() {
        let keepMoving = true;
        if (this.currentShape.state === 'fixed') {
            keepMoving = false;
        }

        if (keepMoving) {
            let squaresToMoveTo = this.currentShape.getNextPositionAsRotated();
            if (squaresToMoveTo) {
                this.currentShape.updatePosition(squaresToMoveTo);
                this.currentShape.rotate();
            }
        }
    }

    shapeShouldBecomeFixed() {
        let squaresToMoveToNext = this.currentShape.getNextPositionGoingDown();
        for (let row of squaresToMoveToNext) {
            for (let i = 0; i < row.length; i++) {
                let { square, type } = row[i];
                if (type === 'filled') {
                    if (square[0] >= 20 || this.board.squares[square[0]][square[1]] === 'occupied') {
                        return true;
                    }
                }
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
