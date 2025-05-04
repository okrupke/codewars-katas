/**
# Counting Change Combinations
# counting-change-combinations
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/541af676b589989aed0009e7
# Tags: Puzzles, Recursion
# Completed at: 2025-05-04

*/

// Solution goes here
function countChange(amount, coins) {
  // Create a DP array where dp[i] represents the number of ways to make amount i
  const dp = Array(amount + 1).fill(0);

  // There is exactly 1 way to make amount 0: use no coins
  dp[0] = 1;

  // Loop over each coin denomination
  for (let coin of coins) {
    // For each sub-amount from coin to target amount
    for (let i = coin; i <= amount; i++) {
      // Add ways to make (i - coin) to the current amount
      // This ensures that each combination uses the coin at least once
      dp[i] += dp[i - coin];
    }
  }

  // dp[amount] contains the total number of combinations to form the target amount
  return dp[amount];
}
