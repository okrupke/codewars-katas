/**
# Shortest Word
# shortest-word
# Rank: 7 kyu
# URL: https://www.codewars.com/kata/57cebe1dc6fdc20c57000ac9
# Tags: Fundamentals
# Completed at: 2025-04-17

*/

// Solution goes here
// Function that finds the length of the shortest word in a string
function findShort(s) {
  // Split the input string into an array of words
  let words = s.split(" ");

  // Initialize result with a large number to ensure any word length will be smaller
  let result = 11111111;

  // Loop through each word in the array
  for (word of words) {
    // If the current word is shorter than the current result, update result
    if (word.length < result) {
      result = word.length;
    }
  }

  // Return the length of the shortest word found
  return result;
}

// Example usage and expected outputs:
// findShort("The quick brown fox")       => 3 ("The")
// findShort("bitcoin take over the world maybe who knows perhaps") => 3 ("the", "who")
// findShort("Let's travel abroad shall we") => 2 ("we")
