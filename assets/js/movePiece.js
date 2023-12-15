"use strict";

function movePiece(piece, target){
    const $chessboard = document.querySelector('#chessboard');
    const targetRow = target.getAttribute('data-row');
    const targetCol = target.getAttribute('data-col');
    const pieceIMG = piece.getAttribute('alt');

    piece.remove();
    // add the piece to the target
    target.innerHTML = `<img src="assets/media/${pieceIMG}.png" alt="${pieceIMG}" data-row="${targetRow}" data-col="${targetCol}"">`;

}