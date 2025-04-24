/**
# Sum of Pairs
# sum-of-pairs
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/54d81488b981293527000c8f
# Tags: Memoization, Fundamentals, Performance
# Completed at: 2025-04-24

*/

// Solution goes here
function sumPairs(ints, s) {
  let seen = new Map();  // Map to store numbers and their indices
  
  for (let i = 0; i < ints.length; i++) {
    let needed = s - ints[i];  // Calculate the required number to make the sum
    
    // If the required number has been seen before, return the pair
    if (seen.has(needed)) {
      return [needed, ints[i]];  // Return the first valid pair we find
    }

    // Otherwise, store the current number and its index in the seen map
    seen.set(ints[i], i);
  }
  
  return undefined;  // If no pair is found
}


// sumPairs([1, 2, 3, 4, 5], 7);
// Expected Output: [3, 4]
// Explanation: Iterating from left to right:
// - 1 → needs 6 → not seen
// - 2 → needs 5 → not seen
// - 3 → needs 4 → not seen
// - 4 → needs 3 → 3 was seen return [3, 4]

// sumPairs([1, 2, 3, 4, 5], 10);
// Expected Output: undefined
// Explanation: No pair sums to 10. Only one 5 exists. 5 → needs 5 → not seen yet (and there's no second 5 after it)

// sumPairs([1, 2, 3, 4, 5], 6);
// Expected Output: [2, 4]
// Explanation:
// - 1 → needs 5 → not seen
// - 2 → needs 4 → not seen
// - 3 → needs 3 → not seen
// - 4 → needs 2 → seen → return [2, 4]

// sumPairs([1, 1, 1, 1, 1], 2);
// Expected Output: [1, 1]
// Explanation:
// - 1 → needs 1 → not seen
// - 1 (second one) → needs 1 → seen → return [1, 1]

// sumPairs([5, 1, 2, 3], 7);
// Expected Output: [5, 2]
// Explanation:
// - 5 → needs 2 → not seen
// - 1 → needs 6 → not seen
// - 2 → needs 5 → seen → return [5, 2]
