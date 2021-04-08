class Game {
    constructor() {
        this.board = new Board();
        this.score = new Score();
        this.idIterator = this.IdGenerator();
        this.possibleShapes = Shape.createShapes();
        this.currentShape = new Shape(this.idIterator.next().value, this.possibleShapes);
        this.dropDelay = 60000;
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
        }
    }

    rotateShape() {
        if (this.currentShape.state !== 'fixed' && this.currentShape.name !== 'o') {
            let squaresToMoveTo = this.currentShape.getNextPositionAsRotated();
            let needToSlide = false; 

            const squaresToCheck = this.currentShape.getNextFilledSquares(squaresToMoveTo);
            const { A, G, B, C, E, F, D } = squaresToCheck;
            const firstSquaresToCheck = [A, G, B, C];

            if (firstSquaresToCheck.some(square => this.isBlocked(square))) {
                needToSlide = true;
            }

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
                } else if (this.currentShape.name === 'l') {
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
            this.currentShape.rotate();
        }
    }

    slideAndRotate(direction, squaresToMoveTo) {
        switch(direction) {
            case 'left twice':
                this.currentShape.shift('left', -20);
                this.currentShape.shift('left', -20);
                return this.tryToSlideLeftTwiceAndRotate(squaresToMoveTo);
            case 'left':
                this.currentShape.shift('left', -20);
                return this.tryToSlideLeftAndRotate(squaresToMoveTo);
            case 'right':
                this.currentShape.shift('left', 20);
                return this.tryToSlideRightAndRotate(squaresToMoveTo);
            case 'down':
                this.currentShape.shift('top', 20);
                return this.tryToSlideDownAndRotate(squaresToMoveTo);
            case 'up':
                this.currentShape.shift('top', -20);
                return this.tryToSlideUpAndRotate(squaresToMoveTo);
            case 'up twice':
                this.currentShape.shift('top', -20);
                this.currentShape.shift('top', -20);
                return this.tryToSlideUpTwiceAndRotate(squaresToMoveTo);
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

    tryToSlideUpAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0] - 1, square[1]], type };
            });
        });
        return this.shapeCanMove(squaresToTry);
    }

    tryToSlideUpTwiceAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0] - 2, square[1]], type };
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
