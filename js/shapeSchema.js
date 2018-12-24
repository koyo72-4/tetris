class ShapeSchema {
    static getStartingPosition(classes) {
        let inhabitedSquares = [
            [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
            [ {square: [0, 4], type: 'empty'}, {square: [0, 5], type: 'empty'}, {square: [0, 6], type: 'empty'}, {square: [0, 7], type: 'empty'}],
            [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'empty'}, {square: [1, 6], type: 'empty'}, {square: [1, 7], type: 'empty'}],
            [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
        ];

        if (classes.includes('i')) {
            inhabitedSquares[1].forEach(object => object.type = 'filled');
        } else if (classes.includes('o')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][1].type = inhabitedSquares[2][2].type = 'filled';
        } else if (classes.includes('t')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[1][3].type = inhabitedSquares[2][2].type = 'filled';
        } else if (classes.includes('z')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][2].type = inhabitedSquares[2][3].type = 'filled';
        } else if (classes.includes('s')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][0].type = inhabitedSquares[2][1].type = 'filled';
        } else if (classes.includes('l')) {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[1][3].type = inhabitedSquares[2][1].type = 'filled';
        } else if (classes.includes('j')) {
            inhabitedSquares[1][0].type = inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][2].type = 'filled';
        }

        return inhabitedSquares;
    }

    static squareShouldBeFilled(shape, i, j) {
        if (shape.classes.includes('i') && shape.degrees === 0) {
            return (
                i === 0 && j === 1 ||
                i === 1 && j === 1 ||
                i === 2 && j === 1 ||
                i === 3 && j === 1
            ); 
        } else if (shape.classes.includes('i') && shape.degrees === 180) {
            return (
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.classes.includes('t') && shape.degrees === 0) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        } else if (shape.classes.includes('t') && shape.degrees === 90) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.classes.includes('t') && shape.degrees === 180) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 2
            );
        } else if (shape.classes.includes('t') && shape.degrees === 270) {
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 2
            );
        } else if (shape.classes.includes('z') && shape.degrees === 0) { 
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 1
            );
        } else if (shape.classes.includes('z') && shape.degrees === 90) { 
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.classes.includes('z') && shape.degrees === 180) { 
            return (
                i === 0 && j === 3 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 2
            );
        } else if (shape.classes.includes('z') && shape.degrees === 270) { 
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2 ||
                i === 2 && j === 3
            );
        } else if (shape.classes.includes('s') && shape.degrees === 0) {
            return (
                i === 0 && j === 0 ||
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 2 && j === 1
            );
        } else if (shape.classes.includes('s') && shape.degrees === 90) {
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 0 ||
                i === 1 && j === 1
            );
        } else if (shape.classes.includes('s') && shape.degrees === 180) {
            return (
                i === 0 && j === 1 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        } else if (shape.classes.includes('s') && shape.degrees === 270) {
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 0 ||
                i === 2 && j === 1
            );
        } else if (shape.classes.includes('l') && shape.degrees === 0) {
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        } else if (shape.classes.includes('l') && shape.degrees === 90) {
            return (
                i === 0 && j === 3 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.classes.includes('l') && shape.degrees === 180) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2 ||
                i === 2 && j === 3
            );
        } else if (shape.classes.includes('l') && shape.degrees === 270) {
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 1
            );
        } else if (shape.classes.includes('j') && shape.degrees === 0) {
            return (
                i === 0 && j === 1 ||
                i === 1 && j === 1 ||
                i === 2 && j === 0 ||
                i === 2 && j === 1
            );
        } else if (shape.classes.includes('j') && shape.degrees === 90) {
            return (
                i === 0 && j === 0 ||
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2
            );
        } else if (shape.classes.includes('j') && shape.degrees === 180) {
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 2 && j === 1
            );
        } else if (shape.classes.includes('j') && shape.degrees === 270) {
            return (
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        }
    }
}
