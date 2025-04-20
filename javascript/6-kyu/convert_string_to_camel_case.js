/**
# Convert string to camel case
# convert-string-to-camel-case
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/517abf86da9663f1d2000003
# Tags: Regular Expressions, Algorithms, Strings
# Completed at: 2025-04-20

*/

// Solution goes here
// Function to convert dash/underscore-delimited string to camelCase
function toCamelCase(str){
  // Split the input string into words using - or _ as delimiters
  let array = str.split(/[-_]/);

  // Initialize the output with the first word (keep its original casing)
  let output = array[0];

  // Loop through the remaining words starting from the second
  for(let i = 1; i < array.length; i++){
    // Capitalize the first letter and append the rest of the word
    output += array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }

  // Return the camelCased string
  return output;
}
