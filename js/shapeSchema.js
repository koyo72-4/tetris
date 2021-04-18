class ShapeSchema {
    static getStartingLocation() {
        const upperLeftCorner = [-1, 4];
        const boundingBox = [...Array(4)].map((val, rowIndex) => {
            const row = [...Array(4)].map((v, colIndex) => {

                // TO DO: change property names to 'boardLocation' and 'isFilled' (boolean)

                return {
                    square: [
                        rowIndex + upperLeftCorner[0],
                        colIndex + upperLeftCorner[1]
                    ],
                    type: 'empty'
                };
            });
            return row;
        });
        return boundingBox;
    }

    static getStartingPosition(name) {
        const boundingBox = this.getStartingLocation();

        if (name === 'i') {
            boundingBox[1].forEach(object => object.type = 'filled');
        } else if (name === 'o') {
            boundingBox[1][1].type = boundingBox[1][2].type = boundingBox[2][1].type = boundingBox[2][2].type = 'filled';
        } else if (name === 't') {
            boundingBox[1][1].type = boundingBox[1][2].type = boundingBox[1][3].type = boundingBox[2][2].type = 'filled';
        } else if (name === 'z') {
            boundingBox[1][1].type = boundingBox[1][2].type = boundingBox[2][2].type = boundingBox[2][3].type = 'filled';
        } else if (name === 's') {
            boundingBox[1][1].type = boundingBox[1][2].type = boundingBox[2][0].type = boundingBox[2][1].type = 'filled';
        } else if (name === 'l') {
            boundingBox[1][1].type = boundingBox[1][2].type = boundingBox[1][3].type = boundingBox[2][1].type = 'filled';
        } else if (name === 'j') {
            boundingBox[1][0].type = boundingBox[1][1].type = boundingBox[1][2].type = boundingBox[2][2].type = 'filled';
        }

        return boundingBox;
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
