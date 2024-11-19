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

  // Get the grid container position
  const gridRect = document.querySelector('.game-board').getBoundingClientRect();

  // Create a div for the winning line
  const winningLine = document.createElement('div');
  winningLine.classList.add('winning-line');

  // Horizontal win (same row)
  if (a === b && b === c) {
    winningLine.classList.add('horizontal');
    const topPosition = rectA.top - gridRect.top + rectA.height / 2 - 5; // Center vertically
    const leftPosition = rectA.left - gridRect.left; // Align with left edge of grid
    const width = rectA.width * 3; // Full width of the three cells

    winningLine.style.top = `${topPosition}px`;
    winningLine.style.left = `${leftPosition}px`;
    winningLine.style.width = `${width}px`;
    winningLine.style.height = `10px`;
  }
  // Vertical win (same column)
  else if (a % 3 === b % 3 && b % 3 === c % 3) {
    winningLine.classList.add('vertical');
    const leftPosition = rectA.left - gridRect.left + rectA.width / 2 - 5; // Center horizontally
    const topPosition = rectA.top - gridRect.top; // Align with top edge of grid
    const height = rectA.height * 3; // Full height of the three cells

    winningLine.style.left = `${leftPosition}px`;
    winningLine.style.top = `${topPosition}px`;
    winningLine.style.width = `10px`;
    winningLine.style.height = `${height}px`;
  }
  // Diagonal win
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

// Cell click event
const handleCellClick = (index) => {
  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

  if (checkWinner()) {
    statusDisplay.innerText = `${currentPlayer} wins!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
  }
};

// Reset the game
resetButton.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  winner = null;
  statusDisplay.innerText = `Player X's turn`;
  cells.forEach(cell => cell.innerText = '');
  const winningLines = document.querySelectorAll('.winning-line');
  winningLines.forEach(line => line.remove()); // Remove any existing winning lines
});

// Attach click events to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});