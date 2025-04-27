/**
# Strings Mix
# strings-mix
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/5629db57620258aa9d000014
# Tags: Fundamentals, Strings
# Completed at: 2025-04-27

*/

// Solution goes here
// Helper function to count lowercase letter occurrences greater than once
function countLowercaseLetters(str) {
  // Extract only lowercase letters using regex [a-z]
  const matches = str.match(/[a-z]/g);  // Best practice: precise regex targeting lowercase letters
  let result = {};  // Initialize an empty object to store letter counts

  if (matches) {  // Defensive check: only proceed if matches found
    for (const letter of matches) {
      result[letter] = (result[letter] || 0) + 1;  // Increment letter count or initialize to 1
    }
  }

  // Remove letters that occur only once, keeping only relevant letters
  for (const key in result) {
    if (result[key] === 1) {
      delete result[key];  // Best practice: clean up unneeded data early
    }
  }

  return result;  // Return an object of letters with counts > 1
}

// Main function to compare two strings based on lowercase letter counts
function mix(s1, s2) {
  let result = [];  // Array to accumulate formatted parts
  let s1Obj = countLowercaseLetters(s1);  // Get letter counts from first string
  let s2Obj = countLowercaseLetters(s2);  // Get letter counts from second string
  
  // Collect all unique letters from both count objects
  const allLetters = new Set([...Object.keys(s1Obj), ...Object.keys(s2Obj)]);  // Use Set to avoid duplicates
  
  // Iterate over all collected letters
  for (const letter of allLetters) {
    const count1 = s1Obj[letter] || 0;  // Default to 0 if letter is absent
    const count2 = s2Obj[letter] || 0;
    
    // Only consider letters appearing more than once in either string
    if (count1 > 1 || count2 > 1) {
      let prefix;
      let count;
      
      if (count1 > count2) {
        prefix = "1";  // Higher count in first string
        count = count1;
      } else if (count2 > count1) {
        prefix = "2";  // Higher count in second string
        count = count2;
      } else {
        prefix = "=";  // Equal counts in both strings
        count = count1;  // (count1 === count2)
      }
      
      result.push(`${prefix}:${letter.repeat(count)}`);  // Format: prefix:letter(s) repeated
    }
  }
  
  // Sort the results based on multiple rules
  result.sort((a, b) => {
    // Extract prefix and repeated letters
    const prefixA = a.charAt(0);
    const prefixB = b.charAt(0);
    const letterA = a.split(':')[1][0]; // First character after colon
    const letterB = b.split(':')[1][0];
    const countA = a.split(':')[1].length; // Length of repeated letters
    const countB = b.split(':')[1].length;
    
    // Rule 1: Sort by descending letter count
    if (countA !== countB) {
      return countB - countA;
    }
    
    // Rule 2: Sort by prefix priority: 1 < 2 < =
    if (prefixA !== prefixB) {
      const prefixOrder = { '1': 1, '2': 2, '=': 3 };  // Define sorting precedence
      return prefixOrder[prefixA] - prefixOrder[prefixB];
    }
    
    // Rule 3: If prefix is same, sort alphabetically
    return letterA.localeCompare(letterB);
  });
  
  return result.join('/');  // Combine the parts into the final formatted string
}

// Example inputs and expected outputs
// mix("Are they here", "yes, they are here"); // Expected Output: "2:ee/2:yy/=:hh/=:rr"
// mix("looping is fun but dangerous", "less dangerous than coding"); // Expected Output: "1:ooo/1:uuu/2:nnn/2:gg/=:ss/=:dd"
// mix(" In many languages", " there's a pair of functions"); // Expected Output: "1:aaa/1:nnn/2:eee/2:tt/2:ff/2:oo/2:rr/=:cc/=:gg/=:ll/=:ss"
// mix("Lords of the Fallen", "gamekult"); // Expected Output: "1:ee/1:ll/1:oo"
// mix("codewars", "codewars"); // Expected Output: "=:cc/=:dd/=:ee/=:oo/=:rr/=:ss/=:ww"
