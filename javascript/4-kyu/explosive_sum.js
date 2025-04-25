/**
# Explosive Sum
# explosive-sum
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/52ec24228a515e620b0005ef
# Tags: Algorithms, Mathematics, Fundamentals
# Completed at: 2025-04-25

*/

// Solution goes here
// Function to count the number of distinct partitions of an integer `num`
// A partition is a way of writing `num` as a sum of positive integers, where the order of summands doesn't matter
function sum(num) {
  // For small numbers, we can use the recursive solution
  if (num <= 20) {
    return countPartitionsRecursive(num);
  }
  
  // For larger numbers, use dynamic programming with the partition number formula
  return countPartitionsDP(num);
}

// Dynamic programming implementation for counting partitions
function countPartitionsDP(n) {
  // Create an array to store the number of partitions for each number from 0 to n
  const dp = new Array(n + 1).fill(0);
  
  // Base case: There is 1 way to represent 0 (by using no elements)
  dp[0] = 1;
  
  // Fill dp array using the recurrence relation
  // dp[n] = dp[n] + dp[n-k] for each k in pentagonal numbers (1, 2, 5, 7, 12, ...)
  // This uses the pentagonal number theorem for partition counting
  for (let i = 1; i <= n; i++) {
    for (let j = i; j <= n; j++) {
      dp[j] += dp[j - i];
    }
  }
  
  return dp[n];
}

// Original recursive approach (only used for small numbers)
function countPartitionsRecursive(num) {
  const result = [];  // Array to store all valid partitions

  // Helper function to recursively generate partitions
  function partitionHelper(target, max, current) {
    // Base case: when target is reduced to 0, we've found a valid partition
    if (target === 0) {
      result.push([...current]);  // Add a copy of the current partition to the result
      return;
    }

    // Try all values from min(max, target) down to 1 (to avoid using larger numbers than allowed)
    for (let i = Math.min(max, target); i >= 1; i--) {
      current.push(i);  // Add the current number to the partition
      partitionHelper(target - i, i, current);  // Recursively try to partition the remaining target
      current.pop();  // Backtrack: remove the last number and try a smaller one
    }
  }

  // Start the partition generation with the target being `num` and maximum allowed value as `num`
  partitionHelper(num, num, []);
  
  // Return the number of distinct partitions
  return result.length;
}

// Test cases:
// sum(5) should return 7
// sum(10) should return 42
// sum(25) should return 1958
// sum(100) should return 190569292

