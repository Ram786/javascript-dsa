/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
    return checkMoves(board) && checkWinner(board);
};

function checkMoves(board) {
    const [x, o] = countMoves(board);
    const diff = x - o;
    return diff === 0 || diff === 1;
}

function countMoves(board) {
    let x = 0;
    let o = 0;

    for (let row of board) {
        for (let char of row) {
            if (char === 'X') {
                x++;
                continue;
            }

            if (char === 'O') {
                o++;
                continue;
            }
        }
    }

    return [x, o];
}

const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

function getMove(board, coord) {
    const row = Math.floor(coord / 3);
    const col = coord % 3;

    return board[row][col];
}

function isWinner(board, coords) {
    const firstMove = getMove(board, coords[0]);

    if (firstMove === ' ') {
        return false;
    }

    return coords.every((coord) => getMove(board, coord) === firstMove);
}

/**
 * it is possible to have:
 * - no winner
 * - one winner
 * - two winners, but same player
 *
 * Important:
 * Last move should be done by the winner
 *
 * Note:
 * having more than 2 winners is not possible, since it would require
 * more than 5 moves to be done by a player. That is checked by `checkMoves`
 */
function checkWinner(board) {
    let wins = 0;

    const winners = winPositions.filter((position) =>
        isWinner(board, position)
    );
    const length = winners.length;

    // no winner - fine
    if (length === 0) {
        return true;
    }

    const winnerMove = getMove(board, winners[0][0]);

    if (!checkLastMove(board, winnerMove)) {
        return false;
    }

    // one winner - all good
    if (length < 2) {
        return true;
    }

    // two winners. check its same player
    return winnerMove === getMove(board, winners[1][0]);
}

// check that the last move was done by the winner
function checkLastMove(board, winnerMove) {
    const [x, o] = countMoves(board);

    if (winnerMove === 'X') {
        return x > o;
    }

    return x === o;
}
