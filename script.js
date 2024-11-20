const cells = document.querySelectorAll('.cell'); // All the game cells
const statusDisplay = document.getElementById('status'); // The status display element
const resetButton = document.getElementById('resetBtn'); // The reset button

let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board (9 cells)
let currentPlayer = 'X'; // Current player (X starts)
let gameActive = true; // To track if the game is still active
let winner = null; // To track the winner

// Check if there is a winner
const checkWinner = () => {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical lines
    [0, 4, 8], [2, 4, 6] // Diagonal lines
  ];

  // Check each winning pattern
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winner = currentPlayer; // If the pattern matches, set the winner
      highlightWinningCells(pattern); // Highlight the winning cells
      return true;
    }
  }

  // Check if the board is full (draw)
  if (!gameBoard.includes('')) {
    statusDisplay.innerText = "It's a Draw!";
    gameActive = false;
    return true;
  }

  return false;
};

// Highlight the winning cells
const highlightWinningCells = (pattern) => {
  pattern.forEach(index => {
    cells[index].classList.add('winning-cell'); // Add the 'winning-cell' class to each winning cell
  });
};

// Handle a cell click
const handleCellClick = (index) => {
  if (gameBoard[index] !== '' || !gameActive) return; // Ignore clicks on already filled cells or after the game ends

  gameBoard[index] = currentPlayer; // Mark the cell with the current player's symbol
  cells[index].innerText = currentPlayer; // Update the cell with the symbol

  if (checkWinner()) {
    statusDisplay.innerText = `${winner} wins!`; // Display the winner
    gameActive = false; // End the game
  } else {
    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `${currentPlayer}'s turn`; // Update the status message
  }
};

// Reset the game
const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', '']; // Clear the game board
  winner = null;
  currentPlayer = 'X'; // X starts the new game
  gameActive = true;
  statusDisplay.innerText = `${currentPlayer}'s turn`; // Set initial game state

  // Clear the text and winning highlights in all cells
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('winning-cell'); // Remove the highlight from cells
  });
};

// Add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell.dataset.index)); // Listen for cell clicks
});

resetButton.addEventListener('click', resetGame); // Listen for the reset button click