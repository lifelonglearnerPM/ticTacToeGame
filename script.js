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

  // Horizontal win (same row)
  if (a === b && b === c) { 
    winningLine.classList.add('horizontal');
    // Center of the row for horizontal
    winningLine.style.top = `${rectA.top + rectA.height / 2 - 5}px`;
    winningLine.style.left = `${rectA.left - rectA.width / 2}px`;
    winningLine.style.width = `${rectA.width * 3}px`; // Cover all 3 columns
    winningLine.style.height = `10px`;
  } 
  // Vertical win (same column)
  else if (a % 3 === b % 3 && b % 3 === c % 3) { 
    winningLine.classList.add('vertical');
    winningLine.style.left = `${rectA.left + rectA.width / 2 - 5}px`;
    winningLine.style.top = `${rectA.top - rectA.height / 2}px`;
    winningLine.style.height = `${rectA.height * 3}px`; // Cover all 3 rows
    winningLine.style.width = `10px`;
  } 
  // Diagonal win (diagonal line)
  else { 
    const startX = rectA.left + rectA.width / 2;
    const startY = rectA.top + rectA.height / 2;
    const endX = rectC.left + rectC.width / 2;
    const endY = rectC.top + rectC.height / 2;

    // Calculate the length of the diagonal line
    const diagonalLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    winningLine.classList.add('diagonal');
    winningLine.style.left = `${startX - diagonalLength / 2}px`;
    winningLine.style.top = `${startY - diagonalLength / 2}px`;
    winningLine.style.width = `${diagonalLength}px`;
    winningLine.style.height = `10px`;

    // Calculate the angle of the line for rotation
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    winningLine.style.transform = `rotate(${angle}deg)`;
    winningLine.style.transformOrigin = 'center';
  }

  // Append the line to the body
  document.body.appendChild(winningLine);
};

// Handle player moves
const handleCellClick = (event) => {
  if (!gameActive) return;

  const cell = event.target;
  const index = cell.dataset.index;

  if (gameBoard[index] !== '') return; // Cell already occupied

  // Update the board and cell
  gameBoard[index] = currentPlayer;
  cell.innerText = currentPlayer;

  // Check for winner
  if (checkWinner()) {
    statusDisplay.innerText = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
};

// Reset the game
const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  winner = null;
  statusDisplay.innerText = `Player X's turn`;

  cells.forEach(cell => {
    cell.innerText = '';
  });

  // Remove any existing winning lines
  const winningLine = document.querySelector('.winning-line');
  if (winningLine) {
    winningLine.remove();
  }
};

// Event Listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);