"use strict";

let currentPlayer = 'white';

function toggleCurrentPlayer() {
    // switches the current player from white to black, or black to white
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    document.querySelector("body").classList.toggle("black");
    return currentPlayer;
}

function addEventListenersToPieces(){
    const $chessboard = document.querySelector('#chessboard');
    const $chessCells = $chessboard.querySelectorAll('.chess-cell');
    $chessCells.forEach(cell => {
        cell.addEventListener("click", selectedPiece);
    });
}

function selectedPiece(e){
    console.log(e.target);
}

function calculatePossibleMoves(piece, row, col) {

}