function* IdGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}

window.addEventListener('keydown', function() {
    if (event.key === 'ArrowLeft') {
        game.slideLeft();
    } else if (event.key === 'ArrowRight') {
        game.slideRight();
    }
});

const idIterator = IdGenerator();
let bottom = 360;

let game = new Game();
game.board.drawBoard();
game.play();
