/**
# Simple Pig Latin
# simple-pig-latin
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/520b9d2ad5c005041100000f
# Tags: Regular Expressions, Algorithms
# Completed at: 2025-04-19

*/

// Solution goes here
// Function to convert a sentence to Pig Latin
function pigIt(str) {
  // Split the string into words, spaces, and punctuation using regex
  // \w+ matches word characters, \s+ matches spaces, [^\w\s] matches punctuation
  let array = str.match(/\w+|\s+|[^\w\s]/g);

  // Map over each element in the array
  array = array.map(word => {
    // Check if the word consists of only letters (including German umlauts and ß)
    if (/^[a-zA-ZäöüÄÖÜß]+$/.test(word)) {
      // Move the first letter to the end and add "ay"
      return word.slice(1) + word[0] + "ay";
    } else {
      // Leave punctuation and whitespace unchanged
      return word;
    }
  });

  // Join all elements back into a single string
  return array.join("");
}
