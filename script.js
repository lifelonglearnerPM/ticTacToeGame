// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

// Game state variables
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
            // Highlight the winning cells
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
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
        cell.classList.remove('winning-cell');
    });
};

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);