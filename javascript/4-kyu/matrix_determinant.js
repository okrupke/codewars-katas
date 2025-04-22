/**
# Matrix Determinant
# matrix-determinant
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/52a382ee44408cea2500074c
# Tags: Matrix, Linear Algebra, Mathematics, Recursion, Algorithms
# Completed at: 2025-04-22

*/

// Solution goes here
// Helper function to generate a submatrix by removing the first row and a specified column
function subMatrix(matrix, columnNo) {
  // Use slice(1) to skip the first row, then remove the specified column from each row using filter
  return matrix.slice(1).map(row => row.filter((_, j) => j !== columnNo)); 
  // This is used in the Laplace expansion step of determinant calculation
}

// Function to calculate the determinant of a square matrix
function determinant(m) {
  let n = m.length; // Store matrix size for readability and reuse

  // Base case: 1x1 matrix, the determinant is the single element itself
  if (n === 1) return m[0][0];

  // Base case: 2x2 matrix, use the direct formula for quick computation
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];

  // Recursive case: apply Laplace expansion on the first row
  let result = 0;
  for (let collumn = 0; collumn < n; collumn++) {
    const sign = (collumn % 2 === 0) ? 1 : -1; // Alternate sign for cofactors (+ - + - ...)
    
    // Multiply the current element, its sign, and the determinant of the submatrix
    result += sign * m[0][collumn] * determinant(subMatrix(m, collumn));
  }

  // Return the accumulated result as the determinant
  return result;
}

// Example inputs and expected outputs
// determinant([[1]]); // Expected Output: 1 (1x1 matrix)
// determinant([[4, 6], [3, 8]]); // Expected Output: 14 (4*8 - 6*3)
// determinant([[1, 2, 3], [0, 4, 5], [1, 0, 6]]); // Expected Output: 22
// determinant([[2, 5, 3], [1, -2, -1], [1, 3, 4]]); // Expected Output: -20
// determinant([[0, 1], [1, 0]]); // Expected Output: -1
