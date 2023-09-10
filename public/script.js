const PLAYER_X = 'X';
const PLAYER_O = 'O';

let currentPlayer = PLAYER_X;
let isGameOver = false;

const buttons = document.querySelectorAll('.btn');
const resultContainer = document.querySelector('.result');
const resetButton = document.querySelector('#reset-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.value === '' && !isGameOver) {
            button.value = currentPlayer;
            button.disabled = true;

            if (checkWin() || checkDraw()) {
                isGameOver = true;
                resultContainer.textContent = isGameOver ? 'Game Over' : '';

                resetButton.disabled = false;
            } else {
                currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
                resultContainer.textContent = `Player ${currentPlayer}'s Turn`;
            }
        }
    });
});

resetButton.addEventListener('click', () => {
    buttons.forEach(button => {
        button.value = '';
        button.disabled = false;
    });

    currentPlayer = PLAYER_X;
    isGameOver = false;
    resultContainer.textContent = `Player ${currentPlayer}'s Turn`;
    resetButton.disabled = true;
});

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (buttons[a].value && buttons[a].value === buttons[b].value && buttons[b].value === buttons[c].value) {
            resultContainer.textContent = `Player ${currentPlayer} wins!`;
            return true;
        }
    }

    return false;
}

function checkDraw() {
    const isDraw = Array.from(buttons).every(button => button.value !== '');
    if (isDraw) {
        resultContainer.textContent = "It's a draw!";
        return true;
    }

    return false;
}

resultContainer.textContent = `Player ${currentPlayer}'s Turn`;