/**
# Sudoku Solver
# sudoku-solver
# Rank: 3 kyu
# URL: https://www.codewars.com/kata/5296bc77afba8baa690002d7
# Tags: Games, Game Solvers, Algorithms
# Completed at: 2025-04-25

*/

// Solution goes here
// Helper function to find the next empty cell (represented by 0)
// Returns [row, col] or null if the puzzle is full
function findEmptyCell(puzzle) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;  // No empty cells found
}

// Check if placing `num` in a 3x3 square is valid
function isSquareValid(puzzle, row, col, num) {
  // Determine the top-left corner of the 3x3 square
  const squareRow = Math.floor(row / 3) * 3;
  const squareCol = Math.floor(col / 3) * 3;

  // Flatten the 3x3 square into an array of values
  let square = Array.from({length: 3}).flatMap((_, r) =>
    Array.from({length: 3}).map((_, c) =>
      puzzle[squareRow + r][squareCol + c]
    )
  );

  // Check if `num` already exists in the square
  return !square.includes(num);
}

// Check if placing `num` in a column is valid
function isColumnValid(puzzle, col, num) {
  // Extract values from the specified column
  const columnValues = Array.from({length: 9}).map((_, row) => puzzle[row][col]);

  return !columnValues.includes(num);
}

// Check if placing `num` in a row is valid
function isRowValid(puzzle, row, num) {
  const rowValues = puzzle[row];
  return !rowValues.includes(num);
}

// Overall validity check for placing `num` at [row][col]
function isValid(puzzle, row, col, num){
  return isColumnValid(puzzle, col, num) &&
         isRowValid(puzzle, row, num) &&
         isSquareValid(puzzle, row, col, num);
}

// Main Sudoku solver function using backtracking
function sudoku(puzzle) {
  // Deep copy to avoid mutating the original puzzle
  const puzzleCopy = JSON.parse(JSON.stringify(puzzle));
  
  // Recursive solver function
  function solve(board) {
    const emptyCell = findEmptyCell(board);
    
    // If no empty cell remains, puzzle is solved
    if (!emptyCell) return true;

    const [row, col] = emptyCell;
    
    // Try digits 1 through 9 in the empty cell
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;  // Tentatively place the number

        if (solve(board)) return true;  // Recursively solve the rest

        board[row][col] = 0;  // Backtrack on failure
      }
    }

    return false;  // Trigger backtracking
  }

  return solve(puzzleCopy) ? puzzleCopy : null;  // Return solved puzzle or null if unsolvable
}
