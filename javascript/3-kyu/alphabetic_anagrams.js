/**
# Alphabetic Anagrams
# alphabetic-anagrams
# Rank: 3 kyu
# URL: https://www.codewars.com/kata/53e57dada0cb0400ba000688
# Tags: Mathematics, Logic, Strings, Algorithms
# Completed at: 2025-05-22

*/

// Solution goes here
/**
 * Calculate the rank of a word in an alphabetically sorted list of all permutations of its letters.
 * @param {string} word - The word to find the rank for (uppercase letters A-Z)
 * @return {number} - The rank of the word (1-based)
 */
function listPosition(word) {
    // Step 1: Count frequency of each letter in the word
    const freq = {};
    for (let char of word) {
        freq[char] = (freq[char] || 0) + 1;
    }

    // Step 2: Get a sorted array of unique characters (used to check lexicographical order)
    const uniqueChars = Object.keys(freq).sort();

    // Step 3: Factorial function for small values (used to count permutations)
    const factorial = (n) => {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    // Step 4: Cache for logarithmic factorial values to handle large numbers without overflow
    const factorialLogCache = [0, 0]; // log(0!) and log(1!) = 0

    // Step 5: Compute log(n!) recursively and cache it
    const factorialLog = (n) => {
        if (factorialLogCache[n] !== undefined) {
            return factorialLogCache[n];
        }
        factorialLogCache[n] = Math.log(n) + factorialLog(n - 1);
        return factorialLogCache[n];
    };

    /**
     * Step 6: Calculate the number of distinct permutations
     * - Handles both small (exact factorial) and large (logarithmic approximation) cases
     * - Accounts for repeated characters (dividing by factorial of counts)
     */
    const calcPermutations = (remainingLength, frequencies) => {
        // Use exact calculation for small inputs
        if (remainingLength <= 12) {
            let numerator = factorial(remainingLength);
            for (const count of Object.values(frequencies)) {
                if (count > 1) {
                    numerator /= factorial(count);
                }
            }
            return numerator;
        }

        // Use log-space to avoid overflow for large inputs
        let logNumerator = factorialLog(remainingLength);
        for (const count of Object.values(frequencies)) {
            if (count > 1) {
                logNumerator -= factorialLog(count);
            }
        }
        return Math.round(Math.exp(logNumerator));
    };

    // Step 7: Initialize position as 1 since ranking is 1-based
    let position = 1;

    // Step 8: For each character in the word (left to right)
    for (let i = 0; i < word.length; i++) {
        const currentChar = word[i];

        // For each character smaller than the current one
        for (const char of uniqueChars) {
            if (char >= currentChar) break;

            if (freq[char] > 0) {
                // Decrease its count to simulate using it as the first letter
                freq[char]--;

                // Calculate how many permutations would start with this smaller character
                const remainingLength = word.length - i - 1;
                const permutations = calcPermutations(remainingLength, freq);

                // Add to position: all words starting with this smaller prefix
                position += permutations;

                // Restore frequency for next iterations
                freq[char]++;
            }
        }

        // Use current character and decrease its frequency
        freq[currentChar]--;

        // If it's exhausted, remove it from list of available characters
        if (freq[currentChar] === 0) {
            uniqueChars.splice(uniqueChars.indexOf(currentChar), 1);
        }
    }

    // Final rank of the word
    return position;
}
