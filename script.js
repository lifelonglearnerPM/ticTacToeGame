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
            // Create and position winning line
            const winningLine = document.createElement('div');
            winningLine.classList.add('winning-line');

            // Horizontal lines
            if (condition[0] === 0 && condition[1] === 1 && condition[2] === 2) {
                winningLine.classList.add('horizontal', 'top');
            } else if (condition[0] === 3 && condition[1] === 4 && condition[2] === 5) {
                winningLine.classList.add('horizontal', 'middle');
            } else if (condition[0] === 6 && condition[1] === 7 && condition[2] === 8) {
                winningLine.classList.add('horizontal', 'bottom');
            } 
            // Vertical lines
            else if (condition[0] === 0 && condition[1] === 3 && condition[2] === 6) {
                winningLine.classList.add('vertical', 'left');
            } else if (condition[0] === 1 && condition[1] === 4 && condition[2] === 7) {
                winningLine.classList.add('vertical', 'center');
            } else if (condition[0] === 2 && condition[1] === 5 && condition[2] === 8) {
                winningLine.classList.add('vertical', 'right');
            } 
            // Diagonal lines
            else if (condition[0] === 0 && condition[1] === 4 && condition[2] === 8) {
                winningLine.classList.add('diagonal-left-to-right');
            } else if (condition[0] === 2 && condition[1] === 4 && condition[2] === 6) {
                winningLine.classList.add('diagonal-right-to-left');
            }

            // Highlight winning cells
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');

            // Add winning line to the game board
            document.querySelector('.game-board').appendChild(winningLine);

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
        cell.classList.remove('winning-cell');
    });
    
    const winningLines = document.querySelectorAll('.winning-line');
    winningLines.forEach(line => line.remove());
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);