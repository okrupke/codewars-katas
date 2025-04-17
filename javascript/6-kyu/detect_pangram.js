/**
# Detect Pangram
# detect-pangram
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/545cedaa9943f7fe7b000048
# Tags: Strings, Data Structures, Fundamentals
# Completed at: 2025-04-17

*/

// Solution goes here
// Function to check if a string is a pangram (contains every letter of the alphabet at least once)
function isPangram(string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"; // All lowercase letters of the alphabet
  var lowerCaseString = string.toLowerCase();    // Convert input string to lowercase for uniform comparison

  // Loop through each letter in the alphabet
  for (var letter of alphabet) {
    // If the current letter is not found in the input string, return false
    if (!lowerCaseString.includes(letter)) {
      return false;
    }
  }
  // If all letters are found, return true
  return true;
}

// Example usage
/*
console.log(isPangram("The quick fox jumps over the lazy dog")); // false 
console.log(isPangram("The quick brown fox jumps over the lazy dog")); // true
console.log(isPangram("Pack my box with five dozen liquor jugs")); // true
console.log(isPangram("Hello World")); // false
*/
