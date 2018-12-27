class Game {
    constructor() {
        this.board = new Board();
        this.score = new Score();
        this.idIterator = this.IdGenerator();
        this.possibleShapes = Shape.createShapes();
        this.currentShape = new Shape(this.idIterator.next().value, this.possibleShapes);
        this.dropDelay = 500;
        this.state = 'not playing';

        this.handleArrowKeys = this.handleArrowKeys.bind(this);
    }

    *IdGenerator() {
        let id = 0;
        while (true) {
            yield ++id;
        }
    }

    start() {
        this.board.drawAtStart();
        window.addEventListener('keydown', this.handleArrowKeys);
        this.currentShape.drawAtStart();
        this.updateState('playing');
        this.play();
    }

    handleArrowKeys() {
        if (event.key === 'ArrowLeft') this.slideLeft();
        else if (event.key === 'ArrowRight') this.slideRight();
        else if (event.key === 'ArrowDown') this.drop();
        else if (event.key === 'ArrowUp') this.rotateShape();
    }

    updateState(newState) {
        this.state = newState === 'playing' ? 'playing' : 'not playing';
    }
 
    play() {
        this.floatDownInterval = window.setInterval(this.drop.bind(this), this.dropDelay);
    }

    endGame() {
        this.updateState('not playing');
        window.removeEventListener('keydown', this.handleArrowKeys);
        let grid = document.getElementById('grid');
        window.setTimeout(function() { 
            grid.style.opacity = 0.4;
            let gameOverSign = document.querySelector('#scoreboard h3');
            gameOverSign.textContent = 'Game Over';
        }, this.dropDelay);   
    }

    drop() {
        if (this.shapeShouldBecomeFixed()) {
            this.stopCurrentShapeAndReleaseNewShape();
        } else {
            let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.shift('top', 20);
        }
    }

    slideLeft() {
        if (this.currentShape.state !== 'fixed') {
            let squaresToMoveTo = this.currentShape.getNextPositionGoingLeft();

            if (this.shapeCanMove(squaresToMoveTo)) {
                this.currentShape.updatePosition(squaresToMoveTo);
                this.currentShape.shift('left', -20);

                if (this.shapeShouldBecomeFixed()) {
                    this.stopCurrentShapeAndReleaseNewShape();
                }
            }
        }
    }

    slideRight() {
        if (this.currentShape.state !== 'fixed') {
            let squaresToMoveTo = this.currentShape.getNextPositionGoingRight();

            if (this.shapeCanMove(squaresToMoveTo)) {
                this.currentShape.updatePosition(squaresToMoveTo);
                this.currentShape.shift('left', 20);

                if (this.shapeShouldBecomeFixed()) {
                    this.stopCurrentShapeAndReleaseNewShape();
                }
            }
        }
    }

    rotateShape() {
        if (this.currentShape.state !== 'fixed' && this.currentShape.name !== 'o') {
            let keepMoving = true;
            let squaresToMoveTo = this.currentShape.getNextPositionAsRotated();
            let numberOfOverlappingSquares = this.calculateNumberOfOverlappingSquares(squaresToMoveTo);
    
            if (this.currentShape.name === 'i' && this.currentShape.degrees === 180 && numberOfOverlappingSquares === 2) {
                if (this.tryToSlideLeftTwiceAndRotate(squaresToMoveTo)) {
                    squaresToMoveTo = this.slideAndRotate('left twice', squaresToMoveTo);
                } else {
                    keepMoving = false;
                }
            } else {
                for (let i = 0; i < squaresToMoveTo.length; i++) {
                    for (let j = 0; j < 4; j++) {
                        let { square, type } = squaresToMoveTo[i][j];
                        if (type === 'filled') {
                            if (square[0] < 0) {
                                if (this.tryToSlideDownAndRotate(squaresToMoveTo)) {
                                    squaresToMoveTo = this.slideAndRotate('down', squaresToMoveTo);
                                } else {
                                    keepMoving = false;
                                }
                            } else {
                                if (this.board.squareIsOccupied(square)) {  
                                    let [ leftmostColumn, rightmostColumn ] = this.currentShape.getOutermostColumns();
                                    if (square[1] < leftmostColumn) {
                                        if (this.tryToSlideRightAndRotate(squaresToMoveTo)) {
                                            squaresToMoveTo = this.slideAndRotate('right', squaresToMoveTo);
                                        } else {
                                            keepMoving = false;
                                        }
                                    } else if (square[1] > rightmostColumn) {
                                        if (this.tryToSlideLeftAndRotate(squaresToMoveTo)) {
                                            squaresToMoveTo = this.slideAndRotate('left', squaresToMoveTo);
                                        } else {
                                            keepMoving = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    
            if (keepMoving && squaresToMoveTo) {
                this.currentShape.updatePosition(squaresToMoveTo);
                this.currentShape.rotate();
    
                if (this.shapeShouldBecomeFixed()) {
                    this.stopCurrentShapeAndReleaseNewShape();
                }
            }
        }
    }

    calculateNumberOfOverlappingSquares(squaresToMoveTo) {
        if (this.currentShape.name !== 'i') return 0;
        let occupiedCount = 0;
        for (let i = 0; i < squaresToMoveTo.length; i++) {
            for (let j = 0; j < 4; j++) {
                let { square, type } = squaresToMoveTo[i][j];
                if (type === 'filled') {
                    if (this.board.squareIsOccupied(square)) {
                        occupiedCount++;
                    }
                }
            }
        }
        return occupiedCount;
    }

    slideAndRotate(direction, squaresToMoveTo) {
        if (direction === 'left twice') {
            this.currentShape.shift('left', -20);
            this.currentShape.shift('left', -20);
            return this.tryToSlideLeftTwiceAndRotate(squaresToMoveTo);
        } else if (direction === 'left') {
            this.currentShape.shift('left', -20);
            return this.tryToSlideLeftAndRotate(squaresToMoveTo);
        } else if (direction === 'right') {
            this.currentShape.shift('left', 20);
            return this.tryToSlideRightAndRotate(squaresToMoveTo);
        } else if (direction === 'down') {
            this.currentShape.shift('top', 20);
            return this.tryToSlideDownAndRotate(squaresToMoveTo);
        }
    }

    tryToSlideDownAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0] + 1, square[1]], type };
            });
        });
        return this.shapeCanMove(squaresToTry);
    }

    tryToSlideLeftAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0], square[1] - 1], type };
            });
        });
        return this.shapeCanMove(squaresToTry);
    }

    tryToSlideLeftTwiceAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0], square[1] - 2], type };
            });
        });
        return this.shapeCanMove(squaresToTry);
    }

    tryToSlideRightAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0], square[1] + 1], type };
            });
        });
        return this.shapeCanMove(squaresToTry);
    }

    shapeCanMove(squaresToMoveTo) {
        for (let row of squaresToMoveTo) {
            for (let i = 0; i < row.length; i++) {
                let { square, type } = row[i];
                if (type === 'filled') {
                    if (this.board.squareIsOccupied(square)) {
                        return false;
                    }
                }
            }
        }
        return squaresToMoveTo;
    }

    shapeShouldBecomeFixed() {
        let squaresToMoveToNext = this.currentShape.getNextPositionGoingDown();
        for (let row of squaresToMoveToNext) {
            for (let i = 0; i < row.length; i++) {
                let { square, type } = row[i];
                if (type === 'filled') {
                    if (square[0] >= 20 || this.board.squares[square[0]][square[1]].match(/occupied\([a-z]\)/)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getNewShape() {
        if (this.possibleShapes.length === 0) {
            this.possibleShapes = Shape.createShapes();
        }
        this.currentShape = new Shape(this.idIterator.next().value, this.possibleShapes);
        this.currentShape.drawAtStart();
    }

    stopCurrentShape() {
        clearInterval(this.floatDownInterval);
        this.currentShape.updateState('fixed');
        this.board.update(this.currentShape.position, this.currentShape.name);
        this.score.addPointsForDroppedShape();
        let newlyCompletedRows = this.board.rowsCompleted();
        this.currentShape.removeFromDOM();
        this.board.colorSquares(this.currentShape);

        if (newlyCompletedRows.length) {
            this.board.deleteRows(newlyCompletedRows);
            this.score.addPointsForCompletedRows(newlyCompletedRows.length);
            window.setTimeout(() => this.board.shiftRowsDown(newlyCompletedRows), this.dropDelay);
            let rowsShiftingDown = true;
            return rowsShiftingDown;
        }
    }

    stopCurrentShapeAndReleaseNewShape() {
        let rowsShiftingDown = this.stopCurrentShape();
        window.setTimeout(function() {
            this.getNewShape();
            this.play();
    
            if (this.shapeShouldBecomeFixed()) {
                this.stopCurrentShape();
                this.endGame();
            }
        }.bind(this), rowsShiftingDown ? this.dropDelay : 0);
    }
}
