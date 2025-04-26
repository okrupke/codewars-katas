/**
# Next smaller number with the same digits
# next-smaller-number-with-the-same-digits
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/5659c6d896bc135c4c00021e
# Tags: Strings, Mathematics, Algorithms
# Completed at: 2025-04-26

*/

// Solution goes here
/**
 * Returns the next smaller positive integer containing the same digits.
 * Returns -1 when there is no smaller number with the same digits or when
 * the next smaller number would require the leading digit to be zero.
 * 
 * @param {number} n - A positive integer
 * @return {number} The next smaller number with the same digits or -1
 */
function nextSmaller(n) {
  // Convert the number to an array of digits
  const digits = n.toString().split('').map(Number);
  
  // Edge case: single digit numbers have no smaller arrangement
  if (digits.length <= 1) return -1;
  
  // Search from right to left for the first digit that is larger than its immediate right neighbor
  // (This identifies where the descending sequence from the right end is broken)
  let i;
  for (i = digits.length - 2; i >= 0; i--) {
    if (digits[i] > digits[i + 1]) {
      break;
    }
  }
  
  // If no such digit is found, return -1
  if (i === -1) return -1;
  
  // Find the largest digit to the right of digits[i] that is smaller than digits[i]
  let largestSmallerIndex = i + 1;
  for (let j = i + 2; j < digits.length; j++) {
    if (digits[j] < digits[i] && digits[j] > digits[largestSmallerIndex]) {
      largestSmallerIndex = j;
    }
  }
  
  // Swap the digits
  [digits[i], digits[largestSmallerIndex]] = [digits[largestSmallerIndex], digits[i]];
  
  // Sort the digits to the right of position i in descending order
  // to get the largest possible arrangement (which is still smaller than the original)
  const rightPart = digits.splice(i + 1).sort((a, b) => b - a);
  
  // Combine the left part with the sorted right part
  const result = parseInt([...digits, ...rightPart].join(''));
  
  // Check if the result has the same number of digits as n
  // If not, it means we've created a number with leading zero(s)
  if (result.toString().length < n.toString().length) {
    return -1;
  }
  
  return result;
}
