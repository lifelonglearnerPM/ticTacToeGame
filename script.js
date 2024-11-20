const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
];

const handleCellClick = (index) => {
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    const isWin = checkWin();
    if (isWin) {
        statusDisplay.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    const isDraw = checkDraw();
    if (isDraw) {
        statusDisplay.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
};

const checkWin = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('winning-line');
            cells[b].classList.add('winning-line');
            cells[c].classList.add('winning-line');
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return !gameBoard.includes('');
};

const resetGame = () => {
    gameBoard.fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winning-line');
    });
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);