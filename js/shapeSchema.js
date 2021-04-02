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

    static squareShouldBeFilled({ name, degrees }, row, col) {
        if (name === 'i' && degrees === 0) {
            return (
                row === 0 && col === 1 ||
                row === 1 && col === 1 ||
                row === 2 && col === 1 ||
                row === 3 && col === 1
            ); 
        } else if (name === 'i' && degrees === 180) {
            return (
                row === 1 && col === 0 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3
            );
        } else if (name === 't' && degrees === 0) {
            return (
                row === 0 && col === 2 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 2 && col === 2
            );
        } else if (name === 't' && degrees === 90) {
            return (
                row === 0 && col === 2 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3
            );
        } else if (name === 't' && degrees === 180) {
            return (
                row === 0 && col === 2 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3 ||
                row === 2 && col === 2
            );
        } else if (name === 't' && degrees === 270) {
            return (
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3 ||
                row === 2 && col === 2
            );
        } else if (name === 'z' && degrees === 0) {
            return (
                row === 0 && col === 2 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 2 && col === 1
            );
        } else if (name === 'z' && degrees === 90) {
            return (
                row === 0 && col === 1 ||
                row === 0 && col === 2 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3
            );
        } else if (name === 'z' && degrees === 180) {
            return (
                row === 0 && col === 3 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3 ||
                row === 2 && col === 2
            );
        } else if (name === 'z' && degrees === 270) {
            return (
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 2 && col === 2 ||
                row === 2 && col === 3
            );
        } else if (name === 's' && degrees === 0) {
            return (
                row === 0 && col === 0 ||
                row === 1 && col === 0 ||
                row === 1 && col === 1 ||
                row === 2 && col === 1
            );
        } else if (name === 's' && degrees === 90) {
            return (
                row === 0 && col === 1 ||
                row === 0 && col === 2 ||
                row === 1 && col === 0 ||
                row === 1 && col === 1
            );
        } else if (name === 's' && degrees === 180) {
            return (
                row === 0 && col === 1 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 2 && col === 2
            );
        } else if (name === 's' && degrees === 270) {
            return (
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 2 && col === 0 ||
                row === 2 && col === 1
            );
        } else if (name === 'l' && degrees === 0) {
            return (
                row === 0 && col === 1 ||
                row === 0 && col === 2 ||
                row === 1 && col === 2 ||
                row === 2 && col === 2
            );
        } else if (name === 'l' && degrees === 90) {
            return (
                row === 0 && col === 3 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3
            );
        } else if (name === 'l' && degrees === 180) {
            return (
                row === 0 && col === 2 ||
                row === 1 && col === 2 ||
                row === 2 && col === 2 ||
                row === 2 && col === 3
            );
        } else if (name === 'l' && degrees === 270) {
            return (
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 1 && col === 3 ||
                row === 2 && col === 1
            );
        } else if (name === 'j' && degrees === 0) {
            return (
                row === 0 && col === 1 ||
                row === 1 && col === 1 ||
                row === 2 && col === 0 ||
                row === 2 && col === 1
            );
        } else if (name === 'j' && degrees === 90) {
            return (
                row === 0 && col === 0 ||
                row === 1 && col === 0 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2
            );
        } else if (name === 'j' && degrees === 180) {
            return (
                row === 0 && col === 1 ||
                row === 0 && col === 2 ||
                row === 1 && col === 1 ||
                row === 2 && col === 1
            );
        } else if (name === 'j' && degrees === 270) {
            return (
                row === 1 && col === 0 ||
                row === 1 && col === 1 ||
                row === 1 && col === 2 ||
                row === 2 && col === 2
            );
        }
    }
}
