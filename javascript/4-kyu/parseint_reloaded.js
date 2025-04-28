/**
# parseInt() reloaded
# parseint-reloaded
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5
# Tags: Parsing, Strings, Algorithms
# Completed at: 2025-04-28

*/

// Solution goes here
const numbers = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
  "ten": 10,
  "eleven": 11,
  "twelve": 12,
  "thirteen": 13,
  "fourteen": 14,
  "fifteen": 15,
  "sixteen": 16,
  "seventeen": 17,
  "eighteen": 18,
  "nineteen": 19,
  "twenty": 20,
  "thirty": 30,
  "forty": 40,
  "fifty": 50,
  "sixty": 60,
  "seventy": 70,
  "eighty": 80,
  "ninety": 90,
};

const multipliers = {
  "hundred": 100,      // "hundred" multiplier
  "thousand": 1000,    // "thousand" multiplier
  "million": 1000000,  // "million" multiplier
};

// Function to parse a string of words into an integer value
function parseInt(string) {
  let result = 0;  // Final result
  let current = 0; // Current group result (temporary sum)

  // Split the input string into words, handling spaces or hyphens as delimiters
  for (let word of string.split(/[ -]/)) {
    if (word in numbers) {
      // If the word is a number, add it to the current group
      current += numbers[word];
    } else if (word in multipliers) {
      // If the word is a multiplier
      if (word === "hundred") {
        // Multiply by 100 for "hundred"
        current *= multipliers[word];
      } else {
        // For "thousand" or "million", add the current group to the result
        result += current * multipliers[word];
        current = 0; // Reset for the next group
      }
    }
  }
  
  // Add the last remaining group to the result (if any)
  result += current;
  
  return result;  // Return the final parsed integer
}
