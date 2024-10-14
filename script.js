document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', icon: 'A' }, { name: 'A', icon: 'A' },
        { name: 'B', icon: 'B' }, { name: 'B', icon: 'B' },
        { name: 'C', icon: 'C' }, { name: 'C', icon: 'C' },
        { name: 'D', icon: 'D' }, { name: 'D', icon: 'D' },
        { name: 'E', icon: 'E' }, { name: 'E', icon: 'E' },
        { name: 'F', icon: 'F' }, { name: 'F', icon: 'F' },
        { name: 'G', icon: 'G' }, { name: 'G', icon: 'G' },
        { name: 'H', icon: 'H' }, { name: 'H', icon: 'H' }
    ];

    const gameBoard = document.getElementById('game-board');
    let firstCard, secondCard;
    let lockBoard = false;
    let moves = 0;
    let matchedCards = 0;
    const movesCounter = document.getElementById('moves');
    const restartButton = document.getElementById('restart');

    movesCounter.textContent = `Moves: ${moves}`;

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardsArray);
        gameBoard.innerHTML = '';
        cardsArray.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-name', card.name);

            const frontFace = document.createElement('div');
            frontFace.classList.add('front');
            frontFace.textContent = card.name;

            const backFace = document.createElement('div');
            backFace.classList.add('back');

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);

            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;
        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name')) {
            disableCards();
            checkWin();
        } else {
            unflipCards();
        }
        updateMoves();
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function checkWin() {
        console.log(`Matched Cards: ${matchedCards}, Total Cards: ${cardsArray.length}`);
        if (matchedCards === cardsArray.length) {
            alert('You win!');
        }
    }

    function updateMoves() {
        moves++;
        movesCounter.textContent = `Moves: ${moves}`;
    }

    function resetGame() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        moves = 0;
        matchedCards = 0;
        movesCounter.textContent = `Moves: ${moves}`;
        createBoard();
    }

    restartButton.addEventListener('click', resetGame);

    createBoard();
});