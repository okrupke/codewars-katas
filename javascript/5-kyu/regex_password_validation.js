/**
# Regex Password Validation
# regex-password-validation
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/52e1476c8147a7547a000811
# Tags: Regular Expressions, Fundamentals
# Completed at: 2025-04-23

*/

// Solution goes here
// assign your RegExp to REGEXP:
const REGEXP = /^(?=[A-Za-z0-9]{6,})(?=[A-Za-z0-9]*[a-z])(?=[A-Za-z0-9]*[A-Z])(?=[A-Za-z0-9]*[0-9])[A-Za-z0-9]+$/

// Example usage:
// This regular expression validates a string based on the following criteria:
// 1. The string must be at least 6 characters long (composed of letters and digits).
// 2. It must contain at least one lowercase letter.
// 3. It must contain at least one uppercase letter.
// 4. It must contain at least one digit.
// 5. Only letters and digits are allowed (no special characters).
//
// Example inputs and expected outputs:
// REGEXP.test("abc123"); // Expected Output: false (No uppercase letter)
// REGEXP.test("Abc123"); // Expected Output: true (Meets all criteria)
// REGEXP.test("abcABC123"); // Expected Output: true (Meets all criteria)
// REGEXP.test("123456"); // Expected Output: false (No lowercase or uppercase letters)
// REGEXP.test("abc!123"); // Expected Output: false (Contains special character '!')
