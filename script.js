// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

// Game state variables
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
];

// Handle cell click event
const handleCellClick = (index) => {
    // Check if the cell is empty and the game is active
    if (gameBoard[index] || !gameActive) return;

    // Update the game board and cell content
    gameBoard[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    // Check for a win
    const isWin = checkWin();
    if (isWin) {
        statusDisplay.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Check for a draw
    const isDraw = checkDraw();
    if (isDraw) {
        statusDisplay.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch the current player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
};

// Check for a win
const checkWin = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Add the winning line class to the cells
            cells[a].classList.add('winning-line');
            cells[b].classList.add('winning-line');
            cells[c].classList.add('winning-line');

            // Determine the type of win and add the appropriate class
            if (a === 0 && b === 1 && c === 2 || a === 3 && b === 4 && c === 5 || a === 6 && b === 7 && c === 8) {
                cells[a].classList.add('horizontal');
                cells[b].classList.add('horizontal');
                cells[c].classList.add('horizontal');
            } else if (a === 0 && b === 3 && c === 6 || a === 1 && b === 4 && c === 7 || a === 2 && b === 5 && c === 8) {
                cells[a].classList.add('vertical');
                cells[b].classList.add('vertical');
                cells[c].classList.add('vertical');
            } else if (a === 0 && b === 4 && c === 8) {
                cells[a].classList.add('diagonal-left-to-right');
                cells[b].classList.add('diagonal-left-to-right');
                cells[c].classList.add('diagonal-left-to-right');
            } else if (a === 2 && b === 4 && c === 6) {
                cells[a].classList.add('diagonal-right-to-left');
                cells[b].classList.add('diagonal-right-to-left');
                cells[c].classList.add('diagonal-right-to-left');
            }

            return true;
        }
    }
    return false;
};

// Check for a draw
const checkDraw = () => {
    return !gameBoard.includes('');
};

// Reset the game
const resetGame = () => {
    gameBoard.fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
    });
};

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);