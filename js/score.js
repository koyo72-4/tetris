class Score {
    constructor() {
        this.value = 0;
    }

    addPointsForDroppedShape() {
        this.updateScore(20);
    }

    updateScore(pointsAdded) {
        this.value += pointsAdded;
        this.displayScore();
    }

    displayScore() {
        let scoreboard = document.querySelector('#scoreboard p');
        scoreboard.textContent = this.value.toString();
    }
}