//Constants / Global variables


//Object that contains function that start the game
const startGame = {
    init: init,
    playerNames: getPlayerNames,
    hidePlayer: hidePlayerForm,
    hideBoard: hideBoard,
    addBoard: addBoard,
    setPlayerNames: setPlayerNames,
    initializeGame: initializeGame,
    renderBoard: renderBoard,


}

//Board colors
const colors = {
    null: 'black',
    '1': 'grey', 
    '-1': 'purple'
};

// Variables tracking state
let board = [null, null, null, null, null, null, null, null, null];
let turn = 1;
let winner = null; 

// Store elements on the page that will be accessed in code more than once in variables:
const squares = document.querySelectorAll('#board div');


//Player 1 Object
const player1 = {
    name: '',
}

//Player 2 Object
const player2 = {
    name: '',
}

// Array of winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function initializeGame() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
}

function renderBoard() {
    squares.forEach((square, index) => {
    square.style.backgroundColor = colors[board[index]];
    });  

//Need to hide and unhide once message pops up
    const message = document.getElementById('message');

    if (winner !== null) {
      if (winner === 'T') {
        message.textContent = 'It\'s a tie!';
      } else {
        const player = winner === 1 ? 'X' : 'O';
        message.textContent = `Player ${player} wins!`;
      }
    } else {
      const player = turn === 1 ? 'X' : 'O';
      message.textContent = `Current turn: Player ${player}`;
    }
}

function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) 
    {
        const [comb1, comb2, comb3] = winningCombinations[i];
        if (board[comb1] !== null && board[comb1] === board[comb2] && board[comb2] === board[comb3]) 
        {
            winner = board[comb1];
            renderBoard();
            break;
        }
    }
}  

function checkTie() {
    if (!board.includes(null) && winner === null) 
    {
      winner = 'T';
      renderBoard();
    }
}

function handleSquareClick(event) {
    const squareIndex = parseInt(event.target.dataset.index);
  
    if (board[squareIndex] !== null || winner !== null) {
      return; // Square is already taken or game is over
    }
    board[squareIndex] = turn;
    renderBoard();
  
    checkWin();
    checkTie();
  
    // Toggle the turn
    turn *= -1;
    
}

function squareClick(event) {
    const squareIndex = parseInt(event.target.dataset.index);
    if (board[squareIndex] === 0 && currentPlayer === 1) 
    {
        board[squareIndex] = 1;
        event.target.textContent = 'X';
    }
}

function setPlayerNames() {
    //Obtains the h1 elements for the names
    const headerName1 = document.querySelector('#displayName');
    const headerName2 = document.querySelector('#displayName2');

    //Removes hidden, adds a class
    headerName1.classList.remove('playerName');
    headerName1.classList.add('hidden');

    //Removes hidden, adds a class
    headerName2.classList.remove('playerName');
    headerName2.classList.add('hidden');

    //Hides the Form
    const playerForm = document.querySelector('#playerForm');
    playerForm.classList.remove('hidden');
    playerForm.classList.add('playerForm');

    const restBtn = document.querySelector('#restart');
    restBtn.classList.remove('btns');
    restBtn.classList.add('hidden');

    const message = document.getElementById('message');
    message.classList.remove('something');
    message.classList.add('hidden');
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

    const restBtn = document.getElementById('restart');
    restBtn.classList.remove('hidden');
    restBtn.classList.add('btns');
}


//Definition of the Init function that starts the game
function init() {
    startGame.hideBoard();
    startGame.initializeGame();
    startGame.renderBoard();
    
}

const replayButton = document.getElementById('restart');
replayButton.addEventListener('click', () => {
  startGame.initializeGame();
  startGame.renderBoard();
  startGame.hideBoard();
  startGame.setPlayerNames();
});

initializeGame();
renderBoard();


//Adds functionality to the Player 1 & Player 2 Form
const startBtn = document.getElementById('startGameBtn');
startBtn.addEventListener('click', startGame.playerNames);

startGame.hideBoard();

squares.forEach((square) => {
    square.addEventListener('click', handleSquareClick);
  });