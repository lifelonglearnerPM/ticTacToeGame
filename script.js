const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let gameBoard = ['', '', '', '', '', '', '', '', '']; // Game board state
let currentPlayer = 'X'; // Start with player X
let gameActive = true; // Game state
let winner = null; // To track winner

// Check if someone has won
const checkWinner = () => {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winner = currentPlayer;
      highlightWinningLine(pattern);
      return true;
    }
  }

  if (!gameBoard.includes('')) {
    statusDisplay.innerText = "It's a Draw!";
    gameActive = false;
    return true;
  }

  return false;
};

// Highlight the winning line
const highlightWinningLine = (pattern) => {
  const [a, b, c] = pattern;

  // Get the positions of the cells for the winning pattern
  const rectA = cells[a].getBoundingClientRect();
  const rectB = cells[b].getBoundingClientRect();
  const rectC = cells[c].getBoundingClientRect();

  // Create a div for the winning line
  const winningLine = document.createElement('div');
  winningLine.classList.add('winning-line');

  // Calculate horizontal line
  if (a === b && b === c) {
    winningLine.classList.add('horizontal');
    const top = rectA.top + rectA.height / 2 - 5; // Center the line vertically
    const left = rectA.left; // Starting point of the line (left edge of the first cell)
    const width = rectA.width * 3; // The line will span the entire row (3 columns)
    const height = 10;

    winningLine.style.top = `${top}px`;
    winningLine.style.left = `${left}px`;
    winningLine.style.width = `${width}px`;
    winningLine.style.height = `${height}px`;
  }
  // Calculate vertical line
  else if (a === c) {
    winningLine.classList.add('vertical');
    const left = rectA.left + rectA.width / 2 - 5; // Center the line horizontally
    const top = rectA.top; // Starting point of the line (top edge of the first cell)
    const height = rectA.height * 3; // The line will span the entire column (3 rows)
    const width = 10;

    winningLine.style.left = `${left}px`;
    winningLine.style.top = `${top}px`;
    winningLine.style.height = `${height}px`;
    winningLine.style.width = `${width}px`;
  }
  // Calculate diagonal line
  else {
    const centerX = rectA.left + rectA.width / 2;
    const centerY = rectA.top + rectA.height / 2;
    const diagonalLength = Math.sqrt(Math.pow(rectA.width * 3, 2) + Math.pow(rectA.height * 3, 2)); // Length of diagonal

    winningLine.classList.add('diagonal');
    winningLine.style.left = `${centerX - diagonalLength / 2}px`; // Starting point of the diagonal
    winningLine.style.top = `${centerY - diagonalLength / 2}px`; // Starting point of the diagonal
    winningLine.style.width = `${diagonalLength}px`; // Diagonal length
    winningLine.style.height = `10px`; // Line thickness
    winningLine.style.transform = `rotate(45deg)`; // Rotate the line to 45 degrees for diagonal
    winningLine.style.transformOrigin = 'center';
  }

  // Add the line to the body
  document.body.appendChild(winningLine);
};

// Handle cell click
const handleCellClick = (index) => {
  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

  if (checkWinner()) {
    statusDisplay.innerText = `${winner} wins!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `${currentPlayer}'s turn`;
  }
};

// Reset the game
const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  winner = null;
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.innerText = `${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.innerText = '';
  });

  const winningLine = document.querySelector('.winning-line');
  if (winningLine) {
    winningLine.remove();
  }
};

// Add event listeners
cells.forEach((cell, index) => {
  cell.dataset.index = index;
  cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);