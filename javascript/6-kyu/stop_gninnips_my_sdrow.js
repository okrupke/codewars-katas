/**
# Stop gninnipS My sdroW!
# stop-gninnips-my-sdrow
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/5264d2b162488dc400000001
# Tags: Strings, Algorithms
# Completed at: 2025-04-21

*/

// Solution goes here
// This function reverses all words in the input string that are 5 or more characters long,
// while keeping shorter words unchanged. Words are assumed to be separated by spaces.

function spinWords(string) {
  // Initialize an empty string to build the final output
  let output = "";
  
  // Split the input string by spaces to process individual words
  let words = string.split(" ");

  // Loop through each word in the array
  for (word of words) {
    // If the word has 5 or more characters, reverse it
    if (word.length >= 5) {
      // Split word into characters, reverse the array, join it back, and append a space
      output += word.split("").reverse().join("") + " ";
    } else {
      // For words shorter than 5 characters, append them as-is with a trailing space
      output += word + " ";
    }
  }

  // Remove the trailing space from the final output string before returning
  // Using slice(0, -1) is a common and efficient way to remove the last character
  return output.slice(0, -1);
}

/*
Example input:
spinWords("Hey fellow warriors");

Expected output:
"Hey wollef sroirraw"

Explanation:
- "Hey" remains unchanged (less than 5 characters)
- "fellow" becomes "wollef"
- "warriors" becomes "sroirraw"
*/

/*
Another example:
spinWords("This is another test");

Expected output:
"This is rehtona test"

Explanation:
- "This" and "is" are unchanged
- "another" becomes "rehtona"
- "test" is unchanged
*/
