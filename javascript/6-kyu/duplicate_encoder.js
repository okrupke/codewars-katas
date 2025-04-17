/**
# Duplicate Encoder
# duplicate-encoder
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/54b42f9314d9229fd6000d9c
# Tags: Strings, Arrays, Fundamentals
# Completed at: 2025-04-17

*/

// Solution goes here
/*
Encodes a string into a new string of parentheses.
'(' for characters that appear only once in the input,
')' for characters that appear more than once.
*/
function duplicateEncode(word) {
  // Normalize to lowercase so 'A' and 'a' are treated the same
  const lowerWord = word.toLowerCase();
  // Set of characters seen at least once
  const seen = new Set();
  // Set of characters that appear more than once
  const duplicates = new Set();
  // The result we’ll build
  let output = "";

  // First pass: identify which letters are duplicates
  for (const letter of lowerWord) {
    if (seen.has(letter)) {
      // If we've already seen it, mark as duplicate
      duplicates.add(letter);
    } else {
      // Otherwise, record that we've now seen it
      seen.add(letter);
    }
  }

  // Second pass: build the encoded string
  for (const letter of lowerWord) {
    if (duplicates.has(letter)) {
      // Duplicate letters → ')'
      output += ")";
    } else {
      // Unique letters → '('
      output += "(";
    }
  }

  // Return the final encoded string
  return output;
}

// Example usage:
console.log(duplicateEncode("recede"));  // "()()()"
console.log(duplicateEncode("Success")); // ")())())"
console.log(duplicateEncode("(( @"));    // "))(("

