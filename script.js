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
  const winningLine = document.createElement('div');
  const [a, b, c] = pattern;
  const rect = cells[a].getBoundingClientRect();

  // Determine the line direction
  if (a === c) {
    winningLine.classList.add('winning-line', 'vertical');
    winningLine.style.left = `${rect.left + rect.width / 2 - 5}px`;
    winningLine.style.height = `${rect.height * 3 + 10}px`;
  } else if (a === b) {
    winningLine.classList.add('winning-line', 'horizontal');
    winningLine.style.top = `${rect.top + rect.height / 2 - 5}px`;
    winningLine.style.width = `${rect.width * 3 + 10}px`;
  } else {
    winningLine.classList.add('winning-line', 'diagonal');
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    winningLine.style.left = `${centerX - 50}px`;
    winningLine.style.top = `${centerY - 50}px`;
    winningLine.style.width = `${Math.sqrt(Math.pow(rect.width * 3, 2) + Math.pow(rect.height * 3, 2)) + 10}px`;
  }

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
cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell.dataset.index));
});

resetButton.addEventListener('click', resetGame);