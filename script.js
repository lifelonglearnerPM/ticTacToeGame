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

  // Horizontal win
  if (a === b && b === c) { 
    winningLine.classList.add('horizontal');
    winningLine.style.top = `${rectA.top + rectA.height / 2 - 5}px`;
    winningLine.style.left = `${rectA.left - rectA.width / 2}px`;
    winningLine.style.width = `${rectA.width * 3}px`; // Cover all 3 columns
    winningLine.style.height = `10px`;
  }
  // Vertical win
  else if (a === c) { 
    winningLine.classList.add('vertical');
    winningLine.style.left = `${rectA.left + rectA.width / 2 - 5}px`;
    winningLine.style.top = `${rectA.top - rectA.height / 2}px`;
    winningLine.style.height = `${rectA.height * 3}px`; // Cover all 3 rows
    winningLine.style.width = `10px`;
  }
  // Diagonal win
  else { 
    const centerX = rectA.left + rectA.width / 2;
    const centerY = rectA.top + rectA.height / 2;
    const diagonalLength = Math.sqrt(Math.pow(rectA.width * 3, 2) + Math.pow(rectA.height * 3, 2));

    winningLine.classList.add('diagonal');
    winningLine.style.left = `${centerX - diagonalLength / 2}px`;
    winningLine.style.top = `${centerY - diagonalLength / 2}px`;
    winningLine.style.width = `${diagonalLength}px`;
    winningLine.style.height = `10px`;
    winningLine.style.transform = `rotate(45deg)`; // Rotate 45 degrees for diagonal
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