let board = [];
for (let i = 0; i < n; i ++) {
    let row = [];
    for (let j = 0; j < n; j ++) {
        row.push('.');
    }
    board.push(row);
}

let output = [];

function nQueen(board, rowIndex) {
    if (rowIndex === board.length) {
        output.push([...board]);
    }
    let n = board.length;
    for (let col = 0; col < n; col ++) {
        if (isValid(board, rowIndex, col)) {
            continue;
        }
        board[rowIndex][col] = 'Q';
        nQueen(board, rowIndex + 1);
        board[rowIndex][col] = '.';
    }
}

function isValid(board, row, col) {
    //判断当前row, col防止Q后是否合法
}