/**
# The Hashtag Generator
# the-hashtag-generator
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/52449b062fb80683ec000024
# Tags: Strings, Algorithms
# Completed at: 2025-04-22

*/

// Solution goes here
// Function to generate a hashtag from a string
function generateHashtag(str) {
  // Check if the input string is empty or only contains spaces. Return false for invalid input
  if (!str || str.trim().length === 0) return false; // Using `trim()` removes any leading/trailing spaces, ensuring clean input

  // Split the input string into an array of words, capitalize the first letter of each word, and then join them
  let array = str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)); // Use `map` for transformation

  // Concatenate the words together and prepend a '#' to form the hashtag
  let output = "#" + array.join(""); // Ensure proper formatting by directly joining the words without spaces

  // If the generated hashtag exceeds 140 characters, return false
  if (output.length > 140) return false; // Maintain Twitter's character limit for hashtags

  // If the generated hashtag is valid (length <= 140), return it
  else return output;
}

// Example inputs and expected outputs
// generateHashtag("hello world"); // Expected Output: "#HelloWorld" (capitalized words, hashtag created)
// generateHashtag("This is a test"); // Expected Output: "#ThisIsATest" (capitalized words, hashtag created)
// generateHashtag("   "); // Expected Output: false (empty or only spaces input)
// generateHashtag("A very long string that exceeds the character limit of one hundred and forty characters..."); 
// Expected Output: false (exceeds 140 characters)
// generateHashtag(""); // Expected Output: false (empty string input)
