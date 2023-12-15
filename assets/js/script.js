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

function selectedPiece(e) {
    const piece = e.target;
    const piecee = piece.getAttribute('alt');
    const row = piece.getAttribute('data-row');
    const col = piece.getAttribute('data-col');

    const color = determinePieceColor(piecee);
    const possibleMoves = calculatePossibleMoves(piecee, color, row, col);
    highlightPossibleMoves(possibleMoves);

    function handleMoveClick(e) {
        const target = e.target;
        movePiece(piece, target);

        // Remove the event listener after the move
        $possibleMovesCells.forEach(cell => {
            cell.removeEventListener("click", handleMoveClick);
        });
    }

    const $possibleMovesCells = document.querySelectorAll('.possible-move');
    $possibleMovesCells.forEach(cell => {
        cell.addEventListener("click", handleMoveClick);
    });
}

function determinePieceColor(piece) {
    if (piece === null) {
        return null;
    }
    const lastLetter = piece.slice(-1);
    return lastLetter === 'w' ? 'white' : 'black';
}

function highlightPossibleMoves(moves) {
    const $chessboard = document.querySelector('#chessboard');
    const $chessCells = $chessboard.querySelectorAll('.chess-cell');

    $chessCells.forEach(cell => {
        const cellRow = cell.getAttribute('data-row');
        const cellCol = cell.getAttribute('data-col');

        const isPossibleMove = moves.some(move => move[0] == cellRow && move[1] == cellCol);

        if (isPossibleMove) {
            cell.classList.add('possible-move');
        } else {
            cell.classList.remove('possible-move');
        }
    });
}

function checkIfPieceInCell(row, col) {
    const $chessboard = document.querySelector('#chessboard');
    const $chessCell = $chessboard.querySelector(`.chess-cell[data-row="${row}"][data-col="${col}"]`);

    if ($chessCell) {
        // Check if there is an image (piece) in the cell
        const hasPiece = $chessCell.querySelector('img') !== null;
        return hasPiece;
    }

    return false; // Cell not found
}


function calculatePossibleMoves(piece, color, row, col) {
    let possibleMoves = [];
    console.log(piece, color, row, col);
    switch (piece) {
        case 'pawnw':
            possibleMoves = calculatePossibleMovesPawnWhite(row, col);
            break;
        case 'pawnb':
            possibleMoves = calculatePossibleMovesPawnBlack(row, col);
            break;
        case 'knightw':
            possibleMoves = calculatePossibleMovesKnightWhite(row, col);
            break;
        case 'knightb':
            possibleMoves = calculatePossibleMovesKnightBlack(row, col);
            break;
        case 'bishopw':
            possibleMoves = calculatePossibleMovesBishopWhite(row, col);
            break;
        case 'bishopb':
            possibleMoves = calculatePossibleMovesBishopBlack(row, col);
            break;
        default:
            console.log('Unknown piece');
    }
    return possibleMoves;
}

function calculatePossibleMovesPawnWhite(row, col) {
    row = parseInt(row);
    if (row === 2) {
        return [[row + 1, col], [row + 2, col]];
    } else {
        return [[row + 1, col]];
    }
}

function calculatePossibleMovesPawnBlack(row, col) {
    row = parseInt(row);
    if (row === 7) {
        return [[row - 1, col], [row - 2, col]];
    } else {
        return [[row - 1, col]];
    }
}

function calculatePossibleMovesKnightWhite(row, col) {
    const possibleMoves = [];
    // Define all possible knight moves relative to its position
    const knightMoves = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1]
    ];

    // Iterate through all possible moves and check if they are within the chessboard
    for (const move of knightMoves) {
        const newRow = parseInt(row) + move[0];
        const newColCode = col.charCodeAt(0) + move[1];
        const newCol = String.fromCharCode(newColCode);
        console.log(newRow, newCol);
        console.log(checkIfPieceInCell(newRow, newCol));
        // Check if the new position is within the chessboard (assuming standard 8x8 board)
        if (newRow >= 1 && newRow <= 8 && newCol >= 'a' && newCol <= 'h' && !checkIfPieceInCell(newRow, newCol)) {
            possibleMoves.push([newRow, newCol]);
        }

        // check if there is a piece in the new position

    }

    return possibleMoves;
}

function calculatePossibleMovesKnightBlack(row, col) {
    const possibleMoves = [];
    // Define all possible knight moves relative to its position
    const knightMoves = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1]
    ];

    // Iterate through all possible moves and check if they are within the chessboard
    for (const move of knightMoves) {
        const newRow = parseInt(row) + move[0];
        const newColCode = col.charCodeAt(0) + move[1];
        const newCol = String.fromCharCode(newColCode);
        console.log(newRow, newCol);
        console.log(checkIfPieceInCell(newRow, newCol));
        // Check if the new position is within the chessboard (assuming standard 8x8 board)
        if (newRow >= 1 && newRow <= 8 && newCol >= 'a' && newCol <= 'h' && !checkIfPieceInCell(newRow, newCol)) {
            possibleMoves.push([newRow, newCol]);
        }

        // check if there is a piece in the new position

    }

    return possibleMoves;
}

function calculatePossibleMovesBishopWhite(row, col) {
    const possibleMoves = [];
    // Define all possible bishop moves relative to its position
    const bishopMoves = [
        [-1, -1], [-1, 1],
        [1, -1], [1, 1]
    ];

    for (const move of bishopMoves) {
        let newRow = parseInt(row);
        let newColCode = col.charCodeAt(0);

        while (true) {
            newRow += move[0];
            newColCode += move[1];

            const newCol = String.fromCharCode(newColCode);

            // Check if the new position is within the chessboard (assuming standard 8x8 board)
            if (newRow >= 1 && newRow <= 8 && newCol >= 'a' && newCol <= 'h') {
                // If there is no piece in the new position, add it to possibleMoves
                if (!checkIfPieceInCell(newRow, newCol)) {
                    possibleMoves.push([newRow, newCol]);
                } else {
                    // If there is a piece, stop checking in this direction
                    break;
                }
            } else {
                // If the new position is outside the chessboard, stop checking in this direction
                break;
            }
        }
    }

    return possibleMoves;
}

function calculatePossibleMovesBishopBlack(row, col) {
    const possibleMoves = [];
    // Define all possible bishop moves relative to its position
    const bishopMoves = [
        [-1, -1], [-1, 1],
        [1, -1], [1, 1]
    ];

    for (const move of bishopMoves) {
        let newRow = parseInt(row);
        let newColCode = col.charCodeAt(0);

        while (true) {
            newRow += move[0];
            newColCode += move[1];

            const newCol = String.fromCharCode(newColCode);

            // Check if the new position is within the chessboard (assuming standard 8x8 board)
            if (newRow >= 1 && newRow <= 8 && newCol >= 'a' && newCol <= 'h') {
                // If there is no piece in the new position, add it to possibleMoves
                if (!checkIfPieceInCell(newRow, newCol)) {
                    possibleMoves.push([newRow, newCol]);
                } else {
                    // If there is a piece, stop checking in this direction
                    break;
                }
            } else {
                // If the new position is outside the chessboard, stop checking in this direction
                break;
            }
        }
    }

    return possibleMoves;
}

