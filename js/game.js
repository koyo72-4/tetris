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
                    if (this.board.squareIsOccupied(square)) {
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
                    if (this.board.squareIsOccupied(square)) {
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

        let squaresToMoveTo = this.currentShape.getNextPositionAsRotated();

        if (this.currentShape.classes.includes('i') && this.currentShape.degrees === 180) {
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
            if (occupiedCount === 2) {
                if (this.tryToSlideLeftAndRotate(squaresToMoveTo, occupiedCount)) {
                    let [newSquares, slideTwice] = this.tryToSlideLeftAndRotate(squaresToMoveTo, occupiedCount);
                    if (slideTwice) {
                        this.currentShape.shift('left', -20);
                        this.currentShape.shift('left', -20);
                    } else {
                        this.currentShape.shift('left', -20);
                    }
                    squaresToMoveTo = newSquares;
                } else {
                    keepMoving = false;
                }
            } else if (occupiedCount === 1) {
                for (let i = 0; i < squaresToMoveTo.length; i++) {
                    for (let j = 0; j < 4; j++) {
                        let { square, type } = squaresToMoveTo[i][j];
                        if (type === 'filled') {
                            if (square[0] < 0) {
                                if (this.tryToSlideDownAndRotate(squaresToMoveTo)) {
                                    let newSquares = this.tryToSlideDownAndRotate(squaresToMoveTo);
                                    this.currentShape.shift('top', 20);
                                    squaresToMoveTo = newSquares;
                                } else {
                                    keepMoving = false;
                                }
                            } else {
                                if (this.board.squareIsOccupied(square)) {  
                                    let [ leftmostColumn, rightmostColumn ] = this.currentShape.getOutermostColumns();
                                    if (square[1] < leftmostColumn) {
                                        if (this.tryToSlideRightAndRotate(squaresToMoveTo)) {
                                            let newSquares = this.tryToSlideRightAndRotate(squaresToMoveTo);
                                            this.currentShape.shift('left', 20);
                                            squaresToMoveTo = newSquares;
                                        } else {
                                            keepMoving = false;
                                        }
                                    } else if (square[1] > rightmostColumn) {
                                        if (this.tryToSlideLeftAndRotate(squaresToMoveTo)) {
                                            let [newSquares, slideTwice] = this.tryToSlideLeftAndRotate(squaresToMoveTo);
                                            if (slideTwice) {
                                                this.currentShape.shift('left', -20);
                                                this.currentShape.shift('left', -20);
                                            } else {
                                                this.currentShape.shift('left', -20);
                                            }
                                            squaresToMoveTo = newSquares;
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

        } else {
            for (let i = 0; i < squaresToMoveTo.length; i++) {
                for (let j = 0; j < 4; j++) {
                    let { square, type } = squaresToMoveTo[i][j];
                    if (type === 'filled') {
                        if (square[0] < 0) {
                            if (this.tryToSlideDownAndRotate(squaresToMoveTo)) {
                                let newSquares = this.tryToSlideDownAndRotate(squaresToMoveTo);
                                this.currentShape.shift('top', 20);
                                squaresToMoveTo = newSquares;
                            } else {
                                keepMoving = false;
                            }
                        } else {
                            if (this.board.squareIsOccupied(square)) {  
                                let [ leftmostColumn, rightmostColumn ] = this.currentShape.getOutermostColumns();
                                if (square[1] < leftmostColumn) {
                                    if (this.tryToSlideRightAndRotate(squaresToMoveTo)) {
                                        let newSquares = this.tryToSlideRightAndRotate(squaresToMoveTo);
                                        this.currentShape.shift('left', 20);
                                        squaresToMoveTo = newSquares;
                                    } else {
                                        keepMoving = false;
                                    }
                                } else if (square[1] > rightmostColumn) {
                                    if (this.tryToSlideLeftAndRotate(squaresToMoveTo)) {
                                        let [newSquares, slideTwice] = this.tryToSlideLeftAndRotate(squaresToMoveTo);
                                        if (slideTwice) {
                                            this.currentShape.shift('left', -20);
                                            this.currentShape.shift('left', -20);
                                        } else {
                                            this.currentShape.shift('left', -20);
                                        }
                                        squaresToMoveTo = newSquares;
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

    tryToSlideDownAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0] + 1, square[1]], type };
            });
        });

        for (let i = 0; i < squaresToTry.length; i++) {
            for (let j = 0; j < 4; j++) {
                let { square, type } = squaresToTry[i][j];
                if (type === 'filled') {
                    if (this.board.squareIsOccupied(square)) {
                        return false;
                    }
                }
            }
        }
        return squaresToTry;
    }

    tryToSlideLeftAndRotate(squaresThatWouldHaveCollided, twoOccupieds) {
        let squaresToTry;
        if (twoOccupieds) {
            squaresToTry = squaresThatWouldHaveCollided.map(row => {
                return row.map(({ square, type }) => {
                    return { square: [square[0], square[1] - 2], type };
                });
            });
        } else {
            squaresToTry = squaresThatWouldHaveCollided.map(row => {
                return row.map(({ square, type }) => {
                    return { square: [square[0], square[1] - 1], type };
                });
            });
        }

        for (let i = 0; i < squaresToTry.length; i++) {
            for (let j = 0; j < 4; j++) {
                let { square, type } = squaresToTry[i][j];
                if (type === 'filled') {
                    if (this.board.squareIsOccupied(square)) {
                        return false;
                    }
                }
            }
        }

        if (twoOccupieds) {
            return [squaresToTry, true];
        } else {
            return [squaresToTry, false];
        }
    }

    tryToSlideRightAndRotate(squaresThatWouldHaveCollided) {
        let squaresToTry = squaresThatWouldHaveCollided.map(row => {
            return row.map(({ square, type }) => {
                return { square: [square[0], square[1] + 1], type };
            });
        });

        for (let i = 0; i < squaresToTry.length; i++) {
            for (let j = 0; j < 4; j++) {
                let { square, type } = squaresToTry[i][j];
                if (type === 'filled') {
                    if (this.board.squareIsOccupied(square)) {
                        return false;
                    }
                }
            }
        }
        return squaresToTry;
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
