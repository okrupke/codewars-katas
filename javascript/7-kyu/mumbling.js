/**
# Mumbling
# mumbling
# Rank: 7 kyu
# URL: https://www.codewars.com/kata/5667e8f4e3f572a8f2000039
# Tags: Fundamentals, Strings, Puzzles
# Completed at: 2025-04-17

*/

// Solution goes here
// Function that takes a string and returns a "mumbling" version
function accum(s) {
  var output = "";
  var position = 0;

  // Loop through each letter in the input string
  for (var letter of s) {
    // Add the uppercase version of the current letter
    output += letter.toUpperCase();

    // Add the lowercase version of the current letter times the position of current letter
    for (let i = position; i >= 1; i--) {
      output += letter.toLowerCase();
    }

    // Increase the counter for the next iteration
    position++;

    // Add a dash after each part (will remove the last one later)
    output += "-";
  }

  // Remove the trailing dash and return the result
  return output.slice(0, -1);
}

// Example usage and expected output:
// accum("Hallo") => "H-Aa-Lll-Llll-Ooooo"
// accum("abcd")  => "A-Bb-Ccc-Dddd"
// accum("RqaEzty") => "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"

console.log(accum("Hallo"));
