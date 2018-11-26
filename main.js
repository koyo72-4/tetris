class Round {
    constructor(id) {
        this.id = id;
        this.shapes = this.createShapes(this.id);
        this.shape = this.getRandomShape(this.shapes);
        this.shapeAtBottom = false;
    }

    createShapes(id) {
        let shapeNames = ['i', 'o', 'z', 't', 'l'];
    
        let tetrominoes = shapeNames.map(name => {
            let shape = document.createElement('div');
            shape.classList.add('shape');
            shape.classList.add(name);
            shape.id = name + id;
            for (let i = 0; i < 4; i++) {
                let square = document.createElement('div');
                square.classList.add('square');
                shape.appendChild(square);
            }
            return shape;
        });
    
        return tetrominoes;
    }

    getRandomShape(array) {
        return array[Math.floor(Math.random() * 5)];
    }

    positionShape() {
        this.shape.style.position = 'absolute';
        this.shape.style.top = '0px';
        let classes = Array.from(this.shape.classList);
        if (classes.includes('i')) {
            this.shape.style.left = '80px';
        } else {
            this.shape.style.left = '100px';
        }
    }

    floatDown() {
        drop = drop.bind(this);
        let floatDownInterval = window.setInterval(() => drop(this.shape), 70);
        let height = Number(this.shape.style.top.substring(0, -2));
    
        function drop(shape) {
            height += 20;
            let classes = Array.from(shape.classList);
            if (classes.includes('i') && height <= (bottom + 20)) {
                shape.style.top = height + 'px';
            } else if (!classes.includes('i') && height <= bottom) {
                shape.style.top = height + 'px';
            } else {
                clearInterval(floatDownInterval);
                this.shapeAtBottom = true;
            }
            if (this.shapeAtBottom) {
                if (classes.includes('i')) {
                    bottom -= 20;
                } else {
                    bottom -= 40;
                }
                play();
            }
        }
    }      

    playRound() {
        this.positionShape();
        document.getElementById('grid').appendChild(this.shape);
        this.floatDown();
    }  
}

function drawGrid() {
    let grid = document.getElementById('grid');
    for (let i = 0; i < 240; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }
}


drawGrid();

let idCounter = 0;
let bottom = 360;

play();

function play() {
    idCounter++;
    let r = new Round(idCounter);
    r.playRound();
}
