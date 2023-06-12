//Constants / Global variables

//Player 1 Object
const player1 = {
    name: '',
    turn: false,
    win: false
}

//Player 2 Object
const player2 = {
    name: '',
    turn: false,
    win: false
}

let currentPlayer = 1;

let boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Array of winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

//Object that contains function that start the game
const startGame = {
    init: init,
    playerNames: getPlayerNames,
    hidePlayer: hidePlayerForm,
    addPlayer: addPlayerForm,
    hideBoard: hideBoard,
    addBoard: addBoard,
    playTurn: playTurn,

}
function renderBoard() {
    const board = document.getElementById('board');
    for (let i = 0; i < boardState.length; i++) {
      const square = document.createElement('div');
      square.id = `c${i}r${Math.floor(i / 3)}`;
      square.classList.add('cell');
      square.addEventListener('click', handleSquareClick);
      board.appendChild(square);
    }
  }

function squareClick(event) {
    const squareIndex = parseInt(event.target.dataset.index);
    if (boardState[squareIndex] === 0 && currentPlayer === 1) 
    {
        boardState[squareIndex] = 1;
        event.target.textContent = 'X';
    //     if (checkWin(1)) 
    //     {
    //         console.log('Player 1 wins!');
    //     } 
    //     else if (boardState.indexOf(0) === -1) 
    //     {
    //         console.log('It\'s a draw!');
    //     } 
    //     else 
    //     {
    //         currentPlayer = 2;
    //     }
    // } 
    // else if (boardState[squareIndex] === 0 && currentPlayer === 2) 
    // {
    //     boardState[squareIndex] = 2;
    //     event.target.textContent = 'O';
    //     if (checkWin(2)) 
    // {
    //     console.log('Player 2 wins!');
    // } 
    // else if (boardState.indexOf(0) === -1) 
    // {
    //     console.log('It\'s a draw!');
    // } 
    // else 
    // {
    //     currentPlayer = 1;
    // }
    }
}

function playTurn(squareIndex, player) {
    // Update the board state with the current player's symbol (1 for X, 2 for O)
    boardState[squareIndex] = player;
  
    // Set the content of the square to 'X' or 'O'
    const square = document.querySelector(`#c${squareIndex}`);
    square.textContent = player === 1 ? 'X' : 'O';
  
    // Check if the current player has won
    if (checkWin(player)) {
      // Current player wins
      console.log(`Player ${player} wins!`);
    } else if (boardState.indexOf(0) === -1) {
      // The board is full, it's a draw
      console.log('It\'s a draw!');
    } else {
      // Toggle the current player's turn
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }
  

function checkWin(player) {
    for (let i = 0; i < winningCombinations.length; i++) 
    {
        const [a, b, c] = winningCombinations[i];
        if (boardState[a] === player && boardState[b] === player && boardState[c] === player) 
        {
            return true;
        }
    }
    return false;
}     

//Hide Player Form
function hidePlayerForm() {
    //Obtains the h1 elements for the names
    const headerName1 = document.querySelector('#displayName');
    const headerName2 = document.querySelector('#displayName2');

    //Removes hidden, adds a class
    headerName1.classList.remove('hidden');
    headerName1.classList.add('playerName');

    //Removes hidden, adds a class
    headerName2.classList.remove('hidden');
    headerName2.classList.add('playerName');

    //Adds values to h1
    headerName1.innerHTML = player1.name;
    headerName2.innerHTML = player2.name;

    //Hides the Form
    const playerForm = document.querySelector('#playerForm');
    playerForm.classList.remove('playerForm');
    playerForm.classList.add('hidden');
}

function addPlayerForm() {
    console.log('hi');
}

//Obtains names from the input values
function getPlayerNames(event) {
    //Prevents parent event handler
    event.preventDefault()
    //Obtains button
    const startBtn = document.getElementById('startGameBtn')
    //Obtains p1 & p2 text inputs
    const playerName= document.querySelector('#p1');
    const playerName2 = document.querySelector('#p2');
    //Adds names to player objects
    player1.name = playerName.value ? playerName.value : 'player 1';
    player2.name = playerName2.value ? playerName2.value : 'player 2' ;
    //Resets input values
    playerName.value = '';
    playerName2.value = '';
    //Hides Form and adds names to h1 player elements
    startGame.hidePlayer();
    startGame.addBoard();
}

//Hides the boardgame while the user inputs information
function hideBoard() {
    //Obtains the board
    const board = document.getElementById('board');
    //Obtains all divs under the parent board
    const boxes = board.querySelectorAll('div');
    //hides each div element
    boxes.forEach( e => {
        e.classList.remove('cell');
        e.classList.add('hidden');
    })
}

function addBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.classList.remove('hidden');
    gameBoard.classList.add('something');
    //Obtains the board
    const board = document.getElementById('board');
    //Obtains all divs under the parent board
    const boxes = board.querySelectorAll('div');
    //hides each div element
    boxes.forEach( e => {
        e.classList.remove('hidden');
        e.classList.add('cell');
    })
}


//Definition of the Init function that starts the game
function init() {
    //Add the initializers like addPlayerform
    //Reset the Board
    //This will be called by the reset button and when the game starts up
    //
    
}

//Starts the game
// startGame.init;

//Adds functionality to the Player 1 & Player 2 Form
const startBtn = document.getElementById('startGameBtn');
startBtn.addEventListener('click', startGame.playerNames);

startGame.hideBoard();

const squares = document.querySelectorAll('#board div');
squares.forEach((square, index) => {
  square.addEventListener('click', squareClick);
  square.setAttribute('data-index', index);
});