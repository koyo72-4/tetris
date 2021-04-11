class Game {
    constructor() {
        this.board = new Board();
        this.score = new Score();
        this.idIterator = this.IdGenerator();
        this.possibleShapes = Shape.createShapes();
        this.currentShape = new Shape(this.idIterator.next().value, this.possibleShapes);
        this.dropDelay = 60000;
        this.lockDelay = 500;
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
        let squaresToMoveTo = this.currentShape.getNextPositionGoingDown();

        if (this.shapeCanMove(squaresToMoveTo)) {
            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.shift('top', 20);

            if (this.shapeShouldBecomeFixed()) {
                this.initiateLockDelay();
            }
        }
    }

    initiateLockDelay() {
        this.lockDelayTimeout = window.setTimeout(this.stopCurrentShapeAndReleaseNewShape.bind(this), this.lockDelay)
    }

    slideLeft() {
        if (this.currentShape.state !== 'fixed') {
            let squaresToMoveTo = this.currentShape.getNextPositionGoingLeft();

            if (this.shapeCanMove(squaresToMoveTo)) {
                this.currentShape.updatePosition(squaresToMoveTo);
                this.currentShape.shift('left', -20);

                if (this.lockDelayTimeout) {
                    if (!this.shapeShouldBecomeFixed()) {
                        window.clearInterval(this.lockDelayTimeout);
                        this.lockDelayTimeout = false;
                    }
                } else if (this.shapeShouldBecomeFixed()) {
                    this.initiateLockDelay();
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

                if (this.lockDelayTimeout) {
                    if (!this.shapeShouldBecomeFixed()) {
                        window.clearInterval(this.lockDelayTimeout);
                        this.lockDelayTimeout = false;
                    }
                } else if (this.shapeShouldBecomeFixed()) {
                    this.initiateLockDelay();
                }
            }
        }
    }

    isBlocked(square) {
        return this.board.squareIsOccupied(square);
    }

    getSlideDirection(shape, degrees, orientation, numberOfTries) {
        const horizontalDirections = ['right', 'left'];
        const verticalDirections = ['up', 'down'];
        const directions = ['up', 'right', 'down', 'left'];
        const extraDirectionsForIShape = ['up twice', 'left twice'];

        switch(shape) {
            case 'i':
                switch(orientation) {
                    case 'horizontal':
                        return numberOfTries === 1 ? 'down' : numberOfTries === 2 ? 'up twice' :  'up';
                    case 'vertical':
                        return numberOfTries === 1 ? 'right' : numberOfTries === 2 ? 'left twice' :  'left';
                }
            case 'l':
                switch(degrees) {
                    case 0:
                        return numberOfTries === 1 ? 'down' : 'up';
                    case 90:
                        return numberOfTries === 1 ? 'left' : 'right';
                    case 180:
                        return numberOfTries === 1 ? 'up' : 'down';
                    case 270:
                        return numberOfTries === 1 ? 'right' : 'left';
                }
            case 'j':
                switch(degrees) {
                    case 0:
                        return numberOfTries === 1 ? 'up' : 'down';
                    case 90:
                        return numberOfTries === 1 ? 'right' : 'left';
                    case 180:
                        return numberOfTries === 1 ? 'down' : 'up';
                    case 270:
                        return numberOfTries === 1 ? 'left' : 'right';
                }
        }
    }

    getAdjustments(direction) {
        switch(direction) {
            case 'left twice':
                return [0, -2];
            case 'left':
                return [0, -1];
            case 'right':
                return [0, 1];
            case 'down':
                return [1, 0];
            case 'up':
                return [-1, 0];
            case 'up twice':
                return [-2, 0];
        }
    }

    adjustSquares(squares, direction) {
        return squares.map(row => {
            return row.map(sq => {
                return {
                    ...sq,
                    square: this.adjustSquare(sq.square, this.getAdjustments(direction))
                };
            });
        });
    }

    adjustSquare([row, col], [rowAdjustment, colAdjustment]) {
        return [row + rowAdjustment, col + colAdjustment];
    }

    rotateShape() {
        if (this.currentShape.state !== 'fixed' && this.currentShape.name !== 'o') {
            let squaresToMoveTo = this.currentShape.getNextPositionAsRotated();

            const squaresToCheck = this.currentShape.getNextFilledSquares(squaresToMoveTo);
            const { A, G, B, C, E, F, D } = squaresToCheck;
            const firstSquaresToCheck = [A, G, B, C];

            const needToSlide = firstSquaresToCheck.some(square => this.isBlocked(square));

            if (needToSlide) {
                if (this.currentShape.name === 'i') {
                    if (this.isBlocked(A) && (this.isBlocked(B) || this.isBlocked(C))) {
                        return;
                    } else if (this.isBlocked(A)) {
                        if (this.isBlocked(D)) {
                            return;
                        } else {
                            const slideDirection = this.getSlideDirection(this.currentShape.name, this.currentShape.degrees, this.currentShape.orientation, 1);
                            squaresToMoveTo = this.slideAndRotate(slideDirection, squaresToMoveTo);  // GBCD
                        }
                    } else if (this.isBlocked(B)) {
                        if (this.isBlocked(E) || this.isBlocked(F)) {
                            return;
                        } else {
                            const slideDirection = this.getSlideDirection(this.currentShape.name, this.currentShape.degrees, this.currentShape.orientation, 2);
                            squaresToMoveTo = this.slideAndRotate(slideDirection, squaresToMoveTo);  // EFAG
                        }
                    } else {  // we know that C is blocked
                        if (this.isBlocked(F)) {
                            return;
                        } else {
                            const slideDirection = this.getSlideDirection(this.currentShape.name, this.currentShape.degrees, this.currentShape.orientation, 3);
                            squaresToMoveTo = this.slideAndRotate(slideDirection, squaresToMoveTo);  // FAGB
                        }
                    }
                } else if (this.currentShape.name === 'l' || this.currentShape.name === 'j') {
                    if (this.isBlocked(C) && (this.isBlocked(A) || this.isBlocked(B))) {
                        return;
                    } else if (this.isBlocked(A) || this.isBlocked(B)) {
                        if (this.isBlocked(D)) {
                            return;
                        } else {
                            const slideDirection = this.getSlideDirection(this.currentShape.name, this.currentShape.degrees, this.currentShape.orientation, 1);
                            squaresToMoveTo = this.slideAndRotate(slideDirection, squaresToMoveTo);  // HGCD
                        }
                    } else {  // we know that C is blocked
                        if (this.isBlocked(E) || this.isBlocked(F)) {
                            return;
                        } else {
                            const slideDirection = this.getSlideDirection(this.currentShape.name, this.currentShape.degrees, this.currentShape.orientation, 2);
                            squaresToMoveTo = this.slideAndRotate(slideDirection, squaresToMoveTo);  // EFBG
                        }
                    }
                }
            }

            this.currentShape.updatePosition(squaresToMoveTo);
            this.currentShape.updateOrientation();
            this.currentShape.rotate();

            if (this.lockDelayTimeout) {
                if (!this.shapeShouldBecomeFixed()) {
                    window.clearInterval(this.lockDelayTimeout);
                    this.lockDelayTimeout = false;
                }
            } else if (this.shapeShouldBecomeFixed()) {
                this.initiateLockDelay();
            }
        }
    }

    slideAndRotate(direction, squaresToMoveTo) {
        switch(direction) {
            case 'left twice':
                this.currentShape.shift('left', -20);
                this.currentShape.shift('left', -20);
                break;
            case 'left':
                this.currentShape.shift('left', -20);
                break;
            case 'right':
                this.currentShape.shift('left', 20);
                break;
            case 'down':
                this.currentShape.shift('top', 20);
                break;
            case 'up':
                this.currentShape.shift('top', -20);
                break;
            case 'up twice':
                this.currentShape.shift('top', -20);
                this.currentShape.shift('top', -20);
                break;
        }
        return this.adjustSquares(squaresToMoveTo, direction);
    }

    shapeCanMove(squaresToMoveTo) {
        return !this.getFilledSquares(squaresToMoveTo).some(square => this.isBlocked(square));
    }

    getFilledSquares(squares) {
        return squares.reduce((arr, currRow) => {
            return arr.concat(
                currRow
                    .filter(sq => sq.type === 'filled')
                    .map(({ square }) => square)
            );
        }, []);
    }

    shapeShouldBecomeFixed() {
        const squaresBelow = this.getFilledSquares(this.currentShape.position)
            .map(([row, col]) => [row + 1, col]);

        return squaresBelow.some(square => this.isBlocked(square));
    }

    getNewShape() {
        if (this.possibleShapes.length === 0) {
            this.possibleShapes = Shape.createShapes();
        }
        this.currentShape = new Shape(this.idIterator.next().value, this.possibleShapes);
        this.currentShape.drawAtStart();
    }

    stopCurrentShape() {
        window.clearInterval(this.floatDownInterval);
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
