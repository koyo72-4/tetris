class ShapeSchema {
    static getStartingPosition(name) {
        let inhabitedSquares = [
            [ {square: [-1, 4], type: 'empty'}, {square: [-1, 5], type: 'empty'}, {square: [-1, 6], type: 'empty'}, {square: [-1, 7], type: 'empty'}],
            [ {square: [0, 4], type: 'empty'}, {square: [0, 5], type: 'empty'}, {square: [0, 6], type: 'empty'}, {square: [0, 7], type: 'empty'}],
            [ {square: [1, 4], type: 'empty'}, {square: [1, 5], type: 'empty'}, {square: [1, 6], type: 'empty'}, {square: [1, 7], type: 'empty'}],
            [ {square: [2, 4], type: 'empty'}, {square: [2, 5], type: 'empty'}, {square: [2, 6], type: 'empty'}, {square: [2, 7], type: 'empty'}]
        ];

        if (name === 'i') {
            inhabitedSquares[1].forEach(object => object.type = 'filled');
        } else if (name === 'o') {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][1].type = inhabitedSquares[2][2].type = 'filled';
        } else if (name === 't') {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[1][3].type = inhabitedSquares[2][2].type = 'filled';
        } else if (name === 'z') {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][2].type = inhabitedSquares[2][3].type = 'filled';
        } else if (name === 's') {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][0].type = inhabitedSquares[2][1].type = 'filled';
        } else if (name === 'l') {
            inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[1][3].type = inhabitedSquares[2][1].type = 'filled';
        } else if (name === 'j') {
            inhabitedSquares[1][0].type = inhabitedSquares[1][1].type = inhabitedSquares[1][2].type = inhabitedSquares[2][2].type = 'filled';
        }

        return inhabitedSquares;
    }

    static squareShouldBeFilled(shape, i, j) {
        if (shape.name === 'i' && shape.degrees === 0) {
            return (
                i === 0 && j === 1 ||
                i === 1 && j === 1 ||
                i === 2 && j === 1 ||
                i === 3 && j === 1
            ); 
        } else if (shape.name === 'i' && shape.degrees === 180) {
            return (
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.name === 't' && shape.degrees === 0) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        } else if (shape.name === 't' && shape.degrees === 90) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.name === 't' && shape.degrees === 180) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 2
            );
        } else if (shape.name === 't' && shape.degrees === 270) {
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 2
            );
        } else if (shape.name === 'z' && shape.degrees === 0) { 
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 1
            );
        } else if (shape.name === 'z' && shape.degrees === 90) { 
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.name === 'z' && shape.degrees === 180) { 
            return (
                i === 0 && j === 3 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 2
            );
        } else if (shape.name === 'z' && shape.degrees === 270) { 
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2 ||
                i === 2 && j === 3
            );
        } else if (shape.name === 's' && shape.degrees === 0) {
            return (
                i === 0 && j === 0 ||
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 2 && j === 1
            );
        } else if (shape.name === 's' && shape.degrees === 90) {
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 0 ||
                i === 1 && j === 1
            );
        } else if (shape.name === 's' && shape.degrees === 180) {
            return (
                i === 0 && j === 1 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        } else if (shape.name === 's' && shape.degrees === 270) {
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 0 ||
                i === 2 && j === 1
            );
        } else if (shape.name === 'l' && shape.degrees === 0) {
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        } else if (shape.name === 'l' && shape.degrees === 90) {
            return (
                i === 0 && j === 3 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3
            );
        } else if (shape.name === 'l' && shape.degrees === 180) {
            return (
                i === 0 && j === 2 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2 ||
                i === 2 && j === 3
            );
        } else if (shape.name === 'l' && shape.degrees === 270) {
            return (
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 1 && j === 3 ||
                i === 2 && j === 1
            );
        } else if (shape.name === 'j' && shape.degrees === 0) {
            return (
                i === 0 && j === 1 ||
                i === 1 && j === 1 ||
                i === 2 && j === 0 ||
                i === 2 && j === 1
            );
        } else if (shape.name === 'j' && shape.degrees === 90) {
            return (
                i === 0 && j === 0 ||
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2
            );
        } else if (shape.name === 'j' && shape.degrees === 180) {
            return (
                i === 0 && j === 1 ||
                i === 0 && j === 2 ||
                i === 1 && j === 1 ||
                i === 2 && j === 1
            );
        } else if (shape.name === 'j' && shape.degrees === 270) {
            return (
                i === 1 && j === 0 ||
                i === 1 && j === 1 ||
                i === 1 && j === 2 ||
                i === 2 && j === 2
            );
        }
    }
}
