/**
# Fastest Code : Equal to 24
# fastest-code-equal-to-24
# Rank: 2 kyu
# URL: https://www.codewars.com/kata/574e890e296e412a0400149c
# Tags: Puzzles, Games
# Completed at: 2025-05-06

*/

// Solution goes here
function equalTo24(a, b, c, d) {
  // Encapsulate input numbers in an array for permutation processing
  const nums = [a, b, c, d];
  
  // Generate all permutations of the 4 input numbers
  const permutations = getPermutations(nums);
  
  // Define possible operations for combining the numbers
  const operations = ['+', '-', '*', '/'];
  
  // Iterate through every permutation of the input numbers
  for (const perm of permutations) {
    // Iterate through every combination of three operations
    for (const op1 of operations) {
      for (const op2 of operations) {
        for (const op3 of operations) {
          
          // Evaluate all valid parenthetical groupings of the 4 numbers and 3 operations

          // Case 1: ((a op1 b) op2 c) op3 d
          const val1_1 = calculate(perm[0], perm[1], op1);
          if (val1_1 !== null) {
            const val1_2 = calculate(val1_1, perm[2], op2);
            if (val1_2 !== null) {
              const val1_3 = calculate(val1_2, perm[3], op3);
              if (val1_3 !== null && Math.abs(val1_3 - 24) < 1e-10) {
                // Return string representation of successful expression
                return `((${perm[0]}${op1}${perm[1]})${op2}${perm[2]})${op3}${perm[3]}`;
              }
            }
          }

          // Case 2: (a op1 b) op2 (c op3 d)
          const val2_1 = calculate(perm[0], perm[1], op1);
          const val2_2 = calculate(perm[2], perm[3], op3);
          if (val2_1 !== null && val2_2 !== null) {
            const val2_3 = calculate(val2_1, val2_2, op2);
            if (val2_3 !== null && Math.abs(val2_3 - 24) < 1e-10) {
              return `(${perm[0]}${op1}${perm[1]})${op2}(${perm[2]}${op3}${perm[3]})`;
            }
          }

          // Case 3: a op1 (b op2 (c op3 d))
          const val3_1 = calculate(perm[2], perm[3], op3);
          if (val3_1 !== null) {
            const val3_2 = calculate(perm[1], val3_1, op2);
            if (val3_2 !== null) {
              const val3_3 = calculate(perm[0], val3_2, op1);
              if (val3_3 !== null && Math.abs(val3_3 - 24) < 1e-10) {
                return `${perm[0]}${op1}(${perm[1]}${op2}(${perm[2]}${op3}${perm[3]}))`;
              }
            }
          }

          // Case 4: a op1 ((b op2 c) op3 d)
          const val4_1 = calculate(perm[1], perm[2], op2);
          if (val4_1 !== null) {
            const val4_2 = calculate(val4_1, perm[3], op3);
            if (val4_2 !== null) {
              const val4_3 = calculate(perm[0], val4_2, op1);
              if (val4_3 !== null && Math.abs(val4_3 - 24) < 1e-10) {
                return `${perm[0]}${op1}((${perm[1]}${op2}${perm[2]})${op3}${perm[3]})`;
              }
            }
          }

          // Case 5: (a op1 (b op2 c)) op3 d
          const val5_1 = calculate(perm[1], perm[2], op2);
          if (val5_1 !== null) {
            const val5_2 = calculate(perm[0], val5_1, op1);
            if (val5_2 !== null) {
              const val5_3 = calculate(val5_2, perm[3], op3);
              if (val5_3 !== null && Math.abs(val5_3 - 24) < 1e-10) {
                return `(${perm[0]}${op1}(${perm[1]}${op2}${perm[2]}))${op3}${perm[3]}`;
              }
            }
          }
        }
      }
    }
  }

  // If no valid expression evaluates to 24, return a failure message
  return "It's not possible!";
}

/**
 * Recursively generates all permutations of the input array
 * @param {Array} arr - Array of numbers to permute
 * @return {Array} Array of all possible permutations
 */
function getPermutations(arr) {
  if (arr.length <= 1) {
    return [arr]; // Base case: single element array
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]; // Fix one element
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)]; // Get the rest
    const permutationsOfRemaining = getPermutations(remaining); // Recursively permute the rest

    for (const perm of permutationsOfRemaining) {
      result.push([current, ...perm]); // Combine fixed element with permutations of the rest
    }
  }

  return result;
}

/**
 * Safely performs the specified arithmetic operation
 * @param {number} a - Left operand
 * @param {number} b - Right operand
 * @param {string} op - Operator ('+', '-', '*', '/')
 * @return {number|null} Result of the operation, or null if invalid (e.g., division by zero)
 */
function calculate(a, b, op) {
  switch(op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : null; // Avoid division by zero
    default: return null; // Graceful fallback for unsupported operator
  }
}

// Example inputs and expected outputs
// equalTo24(4, 1, 8, 7); // Expected Output: ((8/ (4 - 1)) * 7) = 24 or similar valid expression
// equalTo24(1, 1, 1, 1); // Expected Output: It's not possible!
// equalTo24(3, 3, 8, 8); // Expected Output: (8/(3 - 8/3)) = 24 or similar
// equalTo24(5, 5, 5, 1); // Expected Output: ((5 - 1) * (5 + 5)) = 24
// equalTo24(6, 6, 6, 6); // Expected Output: (6 + 6 + 6 + 6) = 24
