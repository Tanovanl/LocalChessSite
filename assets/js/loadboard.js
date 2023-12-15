"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadChessBoard();
    loadChessPieces();
    addEventListenersToPieces();
}


function loadChessBoard(){
    const $chessboard = document.querySelector('#chessboard');
    let html = '';

    for (let row = 8; row >= 1; row--) {
        for (let col = 'a'.charCodeAt(0); col <= 'h'.charCodeAt(0); col++) {
            const colorClass = (row + col) % 2 === 0 ? 'odd' : 'even';
            html += `<div class="chess-cell ${colorClass}" data-row="${row}" data-col="${String.fromCharCode(col)}"></div>`;
        }
    }

    $chessboard.insertAdjacentHTML('beforeend', html);
}

function loadChessPieces(){
    const $chessboard = document.querySelector('#chessboard');
    const $chessCells = $chessboard.querySelectorAll('.chess-cell');
    $chessCells.forEach(function($chessCell){
        const row = $chessCell.getAttribute('data-row');
        const col = $chessCell.getAttribute('data-col');
        const piece = getPiece(row, col);
        if(piece){
            $chessCell.innerHTML = `<img src="assets/media/${piece}.png" alt="${piece}" data-row="${row}" data-col="${col}"">`;
        }
    });
}

function getPiece(row, col){
    const pieces = {
        1: {
            a: 'rookw',
            b: 'knightw',
            c: 'bishopw',
            d: 'queenw',
            e: 'kingw',
            f: 'bishopw',
            g: 'knightw',
            h: 'rookw'
        },
        2: {
            a: 'pawnw',
            b: 'pawnw',
            c: 'pawnw',
            d: 'pawnw',
            e: 'pawnw',
            f: 'pawnw',
            g: 'pawnw',
            h: 'pawnw'
        },
        7: {
            a: 'pawnb',
            b: 'pawnb',
            c: 'pawnb',
            d: 'pawnb',
            e: 'pawnb',
            f: 'pawnb',
            g: 'pawnb',
            h: 'pawnb'
        },
        8: {
            a: 'rookb',
            b: 'knightb',
            c: 'bishopb',
            d: 'queenb',
            e: 'kingb',
            f: 'bishopb',
            g: 'knightb',
            h: 'rookb'
        }
    };

    return pieces[row] ? pieces[row][col] : undefined;
}