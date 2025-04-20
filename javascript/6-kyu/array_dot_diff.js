/**
# Array.diff
# array-dot-diff
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/523f5d21c841566fde000009
# Tags: Arrays, Fundamentals, Algorithms
# Completed at: 2025-04-20

*/

// Solution goes here
function arrayDiff(a, b) {
  // Initialize an empty array to store the results
  let output = [];
  
  // Loop through each element in the first array `a`
  for (let i = 0; i < a.length; i++) {
    // Set a flag to track if the current element in `a` is found in `b`
    let found = false;
    
    // Loop through each element in the second array `b`
    for (let j = 0; j < b.length; j++) {
      // If the element in `a` matches an element in `b`
      if (a[i] === b[j]) {
        // Set the flag to true and break out of the inner loop
        found = true;
        break;
      }
    }
    
    // If the element in `a` was not found in `b`, add it to the `output` array
    if (found === false) {
      output.push(a[i]);
    }
  }
  
  // Return the final result, which is an array of elements from `a` not found in `b`
  return output;
}
