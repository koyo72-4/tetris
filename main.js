let grid = document.getElementById('grid');

for (let i = 0; i < 240; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
}
