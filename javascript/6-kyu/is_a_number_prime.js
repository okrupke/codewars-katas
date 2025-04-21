/**
# Is a number prime?
# is-a-number-prime
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/5262119038c0985a5b00029f
# Tags: Mathematics, Algorithms
# Completed at: 2025-04-21

*/

// Solution goes here

function isPrime(num) {
  // numbers <= 1 are no primes
  if(num <= 1) return false;
  // 2 is the only even prime number
  if(num === 2) return true;
  if(num % 2 == 0) return false;
  // only test odd numbers from 3 to √num
  let lim = Math.sqrt(num);
  for (let i = 3; i <= lim; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
