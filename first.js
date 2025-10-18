let turn = 'O';
let total_turn = 0;


let winner = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let board_array = new Array(9).fill("E");

// --- New: Get player elements ---
const playerO_div = document.getElementById('player1'); // Player O is player1
const playerX_div = document.getElementById('player2'); // Player X is player2
// ---------------------------------

function checkWinner(){
    for(let [index0,index1,index2] of winner)
    {
        if(board_array[index0]!="E"&&board_array[index0]===board_array[index1]&&board_array[index1]===board_array[index2])
            return 1;
    }
    return 0;
}

// --- New: Function to handle player turn visual update ---
function updatePlayerTurnVisual() {
    if (turn === 'O') {
        playerO_div.classList.add('active-player');
        playerX_div.classList.remove('active-player');
    } else {
        playerX_div.classList.add('active-player');
        playerO_div.classList.remove('active-player');
    }
}
// --------------------------------------------------------

// Set initial active player (Player O)
playerO_div.classList.add('active-player');


const printer = (event)=>{

    const element = event.target;
    // if board is empty
    if(board_array[element.id]==="E") 
{
    total_turn++;
    
    // --- New: Game logic remains, but we add turn visual update at the end ---
    let gameEnded = false;

    if(turn==='O')
    {
        element.innerHTML = "O";
        board_array[element.id] = "O";
        if(checkWinner())
        {
            document.getElementById('winningMessage').innerHTML = "Winner is O 🎉";
            board.removeEventListener('click',printer);
            playerO_div.classList.remove('active-player'); // Remove active state on win
            gameEnded = true;
        }
        turn = "X";
    }
    else{
        element.innerHTML = "X";
        board_array[element.id] = "X";
        if(checkWinner())
        {
            document.getElementById('winningMessage').innerHTML = "Winner is X 🏆";
            board.removeEventListener('click',printer);
            playerX_div.classList.remove('active-player'); // Remove active state on win
            gameEnded = true;
        }
        turn = "O";
    }

    if(total_turn==9 && !gameEnded)
    {
        document.getElementById('winningMessage').innerHTML = "Match is Draw 🤝";
        board.removeEventListener('click',printer);
        playerO_div.classList.remove('active-player'); // Remove active state on draw
        playerX_div.classList.remove('active-player'); // Remove active state on draw
    }
    
    // Only update visual if the game has not ended
    if (!gameEnded && total_turn < 9) {
        updatePlayerTurnVisual();
    }
    // -------------------------------------------------------------------------
}   
}


const board = document.querySelector('.board');
board.addEventListener('click',printer);


const Restart = document.getElementById("restartButton");
Restart.addEventListener('click',()=>{
    const cell = document.getElementsByClassName('cell');

    Array.from(cell).forEach((value)=>{
        value.innerHTML = "";
    })

    turn = "O";
    total_turn = 0;
    board_array = new Array(9).fill("E");
    document.getElementById('winningMessage').innerHTML = "";
    
    // Reset visual to Player O
    playerX_div.classList.remove('active-player');
    playerO_div.classList.add('active-player');
    
    board.addEventListener('click',printer);

})