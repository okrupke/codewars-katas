/**
# Smallest possible sum 
# smallest-possible-sum
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/52f677797c461daaf7000740
# Tags: Algorithms, Mathematics, Arrays
# Completed at: 2025-05-04

*/

// Solution goes here
// Euclid's algorithm to find the greatest common divisor (GCD) of two numbers
function gcd(a, b) {
  // Base case: if b is 0, then GCD is a
  // Otherwise, recursively call gcd with (b, a mod b)
  return b === 0 ? a : gcd(b, a % b);
}

// Function to calculate the total number of items evenly divisible by the GCD
function solution(numbers) {
  // Start with the first number as the initial GCD
  let g = numbers[0];

  // Compute the GCD of the entire array
  for (let i = 1; i < numbers.length; i++) {
    g = gcd(g, numbers[i]); // Keep updating GCD as we iterate
  }

  // Return the product of GCD and the number of elements
  // This represents the total number of base units if we evenly divide all elements
  return g * numbers.length;
}
