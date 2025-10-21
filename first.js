let turn = 'O';
let total_turn = 0;

// All possible winning combinations (indices of the board_array)
let winner = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let board_array = new Array(9).fill("E");

// --- Get player elements (These rely on the HTML being loaded) ---
const playerO_div = document.getElementById('player1'); // Player O is player1
const playerX_div = document.getElementById('player2'); // Player X is player2
// ---------------------------------

/**
 * Checks the board_array against all winning patterns.
 * @returns {number} 1 if a winner is found, 0 otherwise.
 */
function checkWinner() {
    for (let [index0, index1, index2] of winner) {
        // Check if all three cells are not 'E' (Empty) and they are all the same
        if (board_array[index0] !== "E" && board_array[index0] === board_array[index1] && board_array[index1] === board_array[index2])
            return 1;
    }
    return 0;
}

// --- CONFETTI FUNCTION ---
function fireConfetti() {
    // This relies on the external script linked in index.html
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: {
                y: 0.6
            }
        });
    } else {
        console.warn("Confetti function not found. Did you link the confetti library in index.html?");
    }
}
// -----------------------------


/**
 * Updates the CSS class to visually highlight the current player's turn.
 */
function updatePlayerTurnVisual() {
    if (turn === 'O') {
        playerO_div.classList.add('active-player');
        playerX_div.classList.remove('active-player');
    } else {
        playerX_div.classList.add('active-player');
        playerO_div.classList.remove('active-player');
    }
}

// Set initial active player (Player O) on load
if (playerO_div) {
    playerO_div.classList.add('active-player');
}

/**
 * Handles a click event on a cell in the board.
 * @param {Event} event The click event object.
 */
const printer = (event) => {

    const element = event.target;
    const cellId = element.id;

    // Check if the clicked element is a cell and if the board position is empty
    // The conditional check `cellId` prevents the whole board container from responding to clicks.
    if (cellId && board_array[cellId] === "E") {
        total_turn++;

        let gameEnded = false;

        if (turn === 'O') {
            element.innerHTML = "O";
            board_array[cellId] = "O";
            if (checkWinner()) {
                document.getElementById('winningMessage').innerHTML = "Congratulation O is winner 🏆";
                board.removeEventListener('click', printer); // Disable further moves
                playerO_div.classList.remove('active-player');
                gameEnded = true;
                fireConfetti();
            }
            turn = "X";
        } else { // turn === 'X'
            element.innerHTML = "X";
            board_array[cellId] = "X";
            if (checkWinner()) {
                document.getElementById('winningMessage').innerHTML = "Congratulation X is winner 🏆";
                board.removeEventListener('click', printer); // Disable further moves
                playerX_div.classList.remove('active-player');
                gameEnded = true;
                fireConfetti();
            }
            turn = "O";
        }

        // Check for a Draw
        if (total_turn === 9 && !gameEnded) {
            document.getElementById('winningMessage').innerHTML = "Match is Draw 🤝";
            board.removeEventListener('click', printer); // Disable further moves
            playerO_div.classList.remove('active-player');
            playerX_div.classList.remove('active-player');
            gameEnded = true; 
        }

        // Only update the active player visual if the game has not ended
        if (!gameEnded) {
            updatePlayerTurnVisual();
        }
    }
}


const board = document.querySelector('.board');
if (board) {
    board.addEventListener('click', printer);
}


const Restart = document.getElementById("restartButton");
if (Restart) {
    Restart.addEventListener('click', () => {
        const cell = document.getElementsByClassName('cell');

        // Clear the visible board cells
        Array.from(cell).forEach((value) => {
            value.innerHTML = "";
        });

        // Reset game variables
        turn = "O";
        total_turn = 0;
        board_array = new Array(9).fill("E");
        document.getElementById('winningMessage').innerHTML = "";

        // Reset visual to Player O
        if (playerX_div) playerX_div.classList.remove('active-player');
        if (playerO_div) playerO_div.classList.add('active-player');

        // Re-enable the click listener
        if (board) {
            board.addEventListener('click', printer);
        }
    });
}