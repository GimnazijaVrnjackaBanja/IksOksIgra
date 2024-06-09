document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const status = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
  
    let currentPlayer = 'X';
    let gameActive = false;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
  
    function startGame() {
      gameActive = true;
      startButton.style.display = 'none';
      restartButton.style.display = 'inline-block';
      board.style.display = 'flex';
      status.textContent = `Na redu je igrač ${currentPlayer}`;
  
      cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
      });
    }
  
    function restartGame() {
      gameActive = false;
      currentPlayer = 'X';
      gameState = ['', '', '', '', '', '', '', '', ''];
      status.textContent = '';
      cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
      });
      startButton.style.display = 'inline-block';
      restartButton.style.display = 'none';
      board.style.display = 'none';
    }
  
    function handleClick(e) {
      const cell = e.target;
      const index = parseInt(cell.id.split('-')[1]) - 1;
  
      if (gameState[index] !== '' || !gameActive) return;
  
      gameState[index] = currentPlayer;
      cell.textContent = currentPlayer;
      
      if (checkWin(currentPlayer)) {
        status.textContent = `Igrač ${currentPlayer} je pobedio!`;
        gameActive = false;
      } else if (!gameState.includes('')) {
        status.textContent = "Nerešeno!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Na redu je igrač ${currentPlayer}`;
      }
    }
  
    function checkWin(player) {
      return winningConditions.some(condition => {
        return condition.every(index => {
          return gameState[index] === player;
        });
      });
    }
  });
  