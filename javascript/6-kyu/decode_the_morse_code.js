/**
# Decode the Morse code 
# decode-the-morse-code
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/54b724efac3d5402db00065e
# Tags: Algorithms
# Completed at: 2025-04-18

*/

// Solution goes here
decodeMorse = function(morseCode) {
  let answer = "";

  // Split the Morse code string into words using 3 spaces as the delimiter
  let words = morseCode.split("   ");

  // Loop through each Morse code word
  for (word of words) {
    // Split the word into individual Morse code letters
    let letters = word.split(" ");

    // Map each Morse symbol to its corresponding character using the MORSE_CODE dictionary
    let decodedLetters = letters.map(symbol => MORSE_CODE[symbol] || "");

    // Join the decoded letters back into a single word
    let decodedWord = decodedLetters.join("");

    // Add the decoded word to the final answer string, followed by a space
    answer += decodedWord + " ";
  }

  // Trim any trailing space and return the final decoded message
  return answer.trim();
}
